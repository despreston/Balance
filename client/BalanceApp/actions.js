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
 * Fetches single project from server
 * @param {string} project Project ID
 * @return {Promise}
 */
export function fetchProject (project) {
  return apiDispatch(`projects/${project._id}`, receiveProjects);
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
 * Fetch user 
 * @param {string} userId of user
 */
export function requestUser (user, loggedIn) {
  return apiDispatch(`users/${user}`, setLoggedInUser);
};

/**
 * Delete project
 * @param {string} id Project ID
 */
export function deleteProject (id) {
  return apiDispatch(`projects/${id}`, null, { method: 'DELETE' });
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
 * resets the current_user
 */
export function resetCurrentUser () {
  return {
    type: RESET_CURRENT_USER
  };
};

/**
 * fetch friends for userId
 * @param {string} userId
 */
export function fetchFriendsForUser (userId) {
  return apiDispatch(`users/${userId}/friends`, receiveUsers);
}