import { apiDispatch, api } from './utils/api';
import { arrayToObj } from './utils/helpers';
import Auth0Lock from 'react-native-lock';
import { saveToken, removeToken } from './utils/auth';

/*
 * action types
 */
export const RECEIVE_USER = 'RECEIVE_USER';
export const LOGGED_IN_USER = 'LOGGED_IN_USER';
export const RESET_USER = 'RESET_USER';

export const RECEIVE_PROJECTS = 'RECEIVE_PROJECTS';
export const RECEIVE_PROJECT = 'RECEIVE_PROJECT';
export const INVALIDATE_PROJECTS = 'INVALIDATE_PROJECTS';

export const RECEIVE_NOTE = 'RECEIVE_NOTE';
export const RECEIVE_NOTES = 'RECEIVE_NOTES';

/*
 * action creators
 */
export function receiveUser (user) {
	return { type: RECEIVE_USER, user };
};

/**
 * @param {object} user
 * @return {action}
 */
export function setLoggedInUser (user) {
  return { type: LOGGED_IN_USER, user };
};

/**
 * Receive projects and convert dates to date objects
 * @param {json} json
 * @return {action}
 */
export function receiveProjects (json) {
  return {
    type: RECEIVE_PROJECTS,
    projects: arrayToObj(json, '_id'),
    receivedAt: Date.now()
  };
};

/**
 * Create action for receiving a single project
 * @param {object} project
 * @return {action}
 */
export function receiveProject (project) {
  return {
    type: RECEIVE_PROJECT,
    project,
    receivedAt: Date.now()
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
 * @param {object} notes
 * @param {action}
 */
export function receiveNotes (notes) {
  return {
    type: RECEIVE_NOTES,
    notes: arrayToObj(notes, '_id'),
    receivedAt: Date.now()
  };
};

/**
 * Create action for receiving a single note
 * @param {object} note
 * @return {action}
 */
export function receiveNote (note) {
  return {
    type: RECEIVE_NOTE,
    note,
    receivedAt: Date.now()
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

  return apiDispatch(url, receiveProject, { method, body: project });
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
  return apiDispatch(url, receiveNote, { method, body: note });
};

/**
 * Fetches single project from server
 * @param {string} project Project ID
 * @return {Promise}
 */
export function fetchProject (project) {
  return apiDispatch(`projects/${project._id}`, receiveProject);
};

/**
 * Fetches projects
 * @return {Promise}
 */
export function fetchProjects (userId) {
  return apiDispatch(`projects?user=${userId}`, receiveProjects);
};

/**
 * Fetches all notes for single project
 * @param {string} project Project ID
 * @return {Promise}
 */
export function requestNotesForProject (project, noteType) {
  return apiDispatch(`notes?project=${project}&type=${noteType}`, receiveNotes);
};

/**
 * Fetch single user
 * @param {string} userId of user
 */
export function fetchUser (user) {
  return apiDispatch(`users/${user}`, receiveUser);
};

/**
 * Delete project
 * @param {string} id Project ID
 */
export function deleteProject (id) {
  return apiDispatch(`projects/${id}`, null, { method: 'DELETE' });
};

export function fetchCurrentUser (userId) {
  return apiDispatch(`users/${userId}`, setLoggedInUser);
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

export function resetCurrentUser () {
  return {
    type: RESET_USER
  };
};