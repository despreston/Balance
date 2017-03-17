import { apiDispatch, api } from './utils/api';
import { arrayToObj } from './utils/helpers';
import formatQueryParams from './utils/query-params';
import Auth0Lock from 'react-native-lock';
import { saveToken } from './utils/auth';
import convertDates from './utils/convert-dates';

/*
 * action types
 */
export const LOGGED_IN_USER = 'LOGGED_IN_USER';
export const RESET_CURRENT_USER = 'RESET_CURRENT_USER';
export const RECEIVE_USERS = 'RECEIVE_USERS';

export const RECEIVE_PROJECTS = 'RECEIVE_PROJECTS';
export const INVALIDATE_PROJECTS = 'INVALIDATE_PROJECTS';

export const RECEIVE_NOTES = 'RECEIVE_NOTES';

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
 * Save a note to server
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
  return apiDispatch(url, receiveNotes, { method, body: note });
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
  return apiDispatch(`notes/${id}`, receiveNotes);
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
      return api(`users`, { method: 'POST', body: profile})
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
  return apiDispatch(`users/${userId}/friends/${friend}`, receiveUsers, { method: 'POST' });
};

/**
 * Remove a friendship
 * @param {String} userId User requesting to remove the friendship
 * @param {String} friend Target user to remove
 */
export function removeFriendship (userId, friend) {
  return apiDispatch(`users/${userId}/friends/${friend}`, receiveUsers, { method: 'DELETE' });
}