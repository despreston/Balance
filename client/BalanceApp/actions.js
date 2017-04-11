import { apiDispatch, api } from './utils/api';
import { arrayToObj } from './utils/helpers';
import formatQueryParams from './utils/query-params';
import Auth0Lock from 'react-native-lock';
import { saveToken } from './utils/auth';

/*
 * action types
 */
export const LOGGED_IN_USER = 'LOGGED_IN_USER';
export const RESET_CURRENT_USER = 'RESET_CURRENT_USER';
export const RECEIVE_USERS = 'RECEIVE_USERS';

export const RECEIVE_PROJECTS = 'RECEIVE_PROJECTS';
export const INVALIDATE_PROJECTS = 'INVALIDATE_PROJECTS';

export const RECEIVE_NOTES = 'RECEIVE_NOTES';

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';

export const REMOVE_REACTION = 'REMOVE_REACTION';

export const RESET = 'RESET';

/**
 * resets redux to the initial state
 */
export function reset () {
  return {
    type: RESET
  };
};

/**
 * @param {object} user
 * @return {action}
 */
export function setLoggedInUser (user) {
  return { type: LOGGED_IN_USER, user };
};

/**
 * creates action for receiving users
 * @param {object} users (single) OR {array} users (multiple)
 * @return {action}
 */
export function receiveUsers (users) {
  if (!Array.isArray(users)) {
    users = [users];
  }

  return {
    type: RECEIVE_USERS,
    users: arrayToObj(users, 'userId')
  };
};

/**
 * creates action for receiving comments
 * @param {object} comments (single) OR {array} comments (multiple)
 * @return {action}
 */
export function receiveComments (comments) {
  if (!Array.isArray(comments)) {
    comments = [comments];
  }

  return {
    type: RECEIVE_COMMENTS,
    comments: arrayToObj(comments, '_id')
  };
};

/**
 * removes a single comment
 * @param {String} comment The _id of the comment to remove
 * @return {action}
 */
export function removeComment (comment) {
  return {
    type: REMOVE_COMMENT,
    comment
  };
};

/**
 * removes a single reaction
 * @param {String} reaction The _id of the reaction to remove
 * @return {action}
 */
export function removeReaction (reaction) {
  return {
    type: REMOVE_REACTION,
    reaction
  };
};

/**
 * Receive projects and convert dates to date objects
 * @param {json} json
 * @return {action}
 */
export function receiveProjects (json) {
  if (!Array.isArray(json)) {
    json = [json];
  }

  return {
    type: RECEIVE_PROJECTS,
    projects: arrayToObj(json, '_id')
  };
};

/**
 * Marks collection as invalidated to flag that a fetch is needed
 * @param {string} collection
 * @return {action} 
 */
export function invalidate (collection) {
  const invalidateProp = {
    projects: INVALIDATE_PROJECTS
  };

  if (!invalidateProp[collection]) {
    throw `Can't validate ${collection}`;
  }

  return { type: invalidateProp[collection] };
};

/**
 * Create action for receiving new list of notes
 * @param {object} notes (single) OR {array} notes (multiple)
 * @param {action}
 */
export function receiveNotes (notes) {
  if (!Array.isArray(notes)) {
    notes = [notes];
  }

  return {
    type: RECEIVE_NOTES,
    notes: arrayToObj(notes, '_id')
  };
};

/**
 * Save a project to server
 * Properly handles POST or PUT determination based on _new flag in project
 * @param {object} project
 * @return {Promise}
 */
export function saveProject (project) {
  let method, url = 'projects';

  if (project._new) {
    method = 'POST';
    delete project._new;
  } else {
    method = 'PUT';
    url += `/${project._id}`;
  }

  delete project.Future;
  delete project.Past;

  return apiDispatch(url, receiveProjects, { method, body: project });
};

/**
 * Save a note to server and invalidate the projects
 * Properly handles POST or PUT determination based on _new flag in note
 * @param {object} note
 * @return {Promise}
 */
export function saveNote (note) {
  let method, url = 'notes';

  if (note._new) {
    method = 'POST';
    delete note._new;
  } else {
    method = 'PUT';
    url += `/${note._id}`;
  }

  return dispatch => {
    dispatch(invalidate('projects'));
    return api(url, { method, body: note })
      .then(user => dispatch(receiveNotes));
  };
};

/**
 * Save a user
 * Updates the user in Auth0 and on success it updates the user in Balance DB
 * Properly handles POST or PUT determination based on _new flag in note
 * @param {object} user
 * @return {Promise}
 */
export function saveUser (user) {
  let method, url = 'users';

  if (user._new) {
    method = 'POST';
    delete user._new;
  } else {
    method = 'PUT';
    url += `/${user.userId}`;
  }

  return dispatch => {
    const encodedUserId = encodeURI(user.userId);
    const auth0url = `https://balanceapp.auth0.com/api/v2/users/${encodedUserId}`;

    let fields = (({ username, email }) => ({ username, email }))(user);

    fields.client_id = CONFIG.clientId;

    return api(auth0url, fields, true)
      .then(updatedUser => api(url, { method, body: user }))
      .then(user => dispatch(receiveUsers(user)))
      .catch(err => console.log('could not save user ', err));
  };
};

/**
 * Fetches single project from server
 * @param {string} project Project ID
 * @return {Promise}
 */
export function fetchProject (project) {
  return apiDispatch(`projects/${project._id}`, receiveProjects);
};

/**
 * Adds a nudge to the project
 * @param {String} project Project ID
 * @return {Promise}
 */
export function nudge (project) {
  const opts = { method: 'POST' };
  return apiDispatch(`projects/${project}/nudges/`, receiveProjects, opts);
};

/**
 * Adds a nudge to the project
 * @param {String} project Project ID
 * @param {String} user User ID of nudger
 * @return {Promise}
 */
export function removeNudge (project, user) {
  const opts = { method: 'DELETE' };
  return apiDispatch(`projects/${project}/nudges/${user}`, receiveProjects, opts);
};

/**
 * Fetches projects
 * @return {Promise}
 */
export function fetchProjectsForUser (userId) {
  return apiDispatch(`projects?user=${userId}`, receiveProjects);
};

/**
 * Fetch notes
 * @param {array} params key/val object pairs. key = param, value = param value
 * @return {Promise}
 */
export function requestNotes (params) {
  return apiDispatch(`notes${formatQueryParams(params)}`, receiveNotes);
};

/**
 * Fetch single note
 * @param {String} id Note ID
 * @return {Promise}
 */
export function fetchNote (id) {
  return dispatch => {
    return api(`notes/${id}`)
    .then(note => {
      let comments = [];

      if (note.comments) {
        note.comments.forEach(c => comments.push(c));
      }

      dispatch(receiveComments(comments));
      return dispatch(receiveNotes(note));
    })
    .catch(err => console.log(err));
  }
};

/**
 * Fetch user 
 * @param {string} userId of user
 */
export function requestUser (user, loggedIn) {
  return apiDispatch(`users/${user}`, loggedIn ? setLoggedInUser : receiveUsers);
};

/**
 * Delete project
 * @param {string} id Project ID
 */
export function deleteProject (id) {
  return apiDispatch(`projects/${id}`, null, { method: 'DELETE' });
};

/**
 * Send a nudge to a user for a project
 * @param {String} project project ID
 */
export function nudgeProject (project) {
  let config = { method: 'POST' };
  return apiDispatch(`projects/${project}/nudges`, receiveProjects, config);
};

/**
 * prompt for log-in and send new user to server
 */
export function login () {
  const { clientId, domain } = CONFIG;
  const lock = new Auth0Lock({ clientId, domain });

  // show lock screen to prompt for login details
  return dispatch => {
    lock.show({}, (err, profile, tokens) => {
      if (err) {
        console.log('something went wrong ' + err);
      }

      // save token to local storage
      saveToken(tokens.idToken).catch( err => {
        console.log('could not save token ', err);
      });

      delete profile.extraInfo;

      // send the user to the server
      return api(`users`, { method: 'POST', body: profile })
        .then(user => dispatch(setLoggedInUser(user)));
    });
  }
};

/**
 * fetch friends for userId
 * @param {string} userId
 */
export function fetchFriendsForUser (userId) {
  return apiDispatch(`users/${userId}/friends`, receiveUsers);
};

/**
 * Create a friend request. Server will figure out what the status should be.
 * @param {String} userId User requesting a friendship
 * @param {String} friend Target user
 */
export function createFriendship (userId, friend) {
  const opts = { method: 'POST' };

  return apiDispatch(`users/${userId}/friends/${friend}`, receiveUsers, opts);
};

/**
 * Remove a friendship
 * @param {String} userId User requesting to remove the friendship
 * @param {String} friend Target user to remove
 */
export function removeFriendship (userId, friend) {
  const opts = { method: 'DELETE' };

  return apiDispatch(`users/${userId}/friends/${friend}`, receiveUsers, opts);
}

/**
 * Create a new comment
 * @param {Object} comment
 * @return {Promise}
 */
export function createComment (comment) {
  const opts = { method: 'POST', body: comment };

  return apiDispatch(`comments`, receiveComments, opts);
};

/**
 * Remove a comment
 * @param {String} comment The _id of the comment
 * @return {Promise}
 */
export function deleteComment (comment) {
  const opts = { method: 'DELETE' };

  return dispatch => {
    return api(`comments/${comment}`, opts)
      .then(result => {
        dispatch(removeComment(comment));
        return dispatch(receiveComments(result));
      });
  };
};

/**
 * Add a reaction to a note
 * @param {String} reaction
 * @param {String} note The _id of the note
 * @param {Promise}
 */
export function addReaction (reaction, note) {
  const opts = { body: { reaction }, method: 'POST' };

  return apiDispatch(`notes/${note}/reactions`, receiveNotes, opts);
};

/**
 * Delete a reaction
 * @param {String} reaction The _id of the reaction to remove
 * @param {Promise}
 */
export function deleteReaction (reaction) {
  const opts = { method: 'DELETE' };

  return apiDispatch(`reactions/${reaction}`, removeReaction, opts);
};