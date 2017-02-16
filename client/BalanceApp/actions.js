import { api } from './utils/api';
import { arrayToObj } from './utils/helpers';

/*
 * action types
 */
export const RECEIVE_USER = 'RECEIVE_USER';
export const REQUEST_USER_FAILED = 'REQUEST_USER_FAILED';

export const SET_AUTHENTICATION = 'SET_AUTHENTICATION';

export const REQUEST_PROJECTS = 'REQUEST_PROJECTS';
export const RECEIVE_PROJECTS = 'RECEIVE_PROJECTS';
export const RECEIVE_PROJECT = 'RECEIVE_PROJECT';

export const RECEIVE_NOTE = 'RECEIVE_NOTE';
export const RECEIVE_NOTES = 'RECEIVE_NOTES';
export const RECEIVE_NOTES_FOR_PROJECT = 'RECEIVE_NOTES_FOR_PROJECT';

/*
 * action creators
 */
export function receiveUser (user) {
	return { type: RECEIVE_USER, user };
};

export function requestProjects () {
  return { type: REQUEST_PROJECTS };
};

/**
 * Set authenticated flag
 * @param {boolean} authenticated
 * @return {action}
 */
export function setAuthenticated (authenticated) {
  return { type: SET_AUTHENTICATION, authenticated };
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
  return api(url, receiveProject, { method, body: project });
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
  return api(url, receiveNote, { method, body: note });
};

/**
 * Fetches single project from server
 * @param {string} project Project ID
 * @return {Promise}
 */
export function fetchProject (project) {
  return api(`projects/${project._id}`, receiveProject);
};

/**
 * Fetches projects
 * @return {Promise}
 */
export function fetchProjects () {
  return api(`projects?user=${CONFIG.userId}`, receiveProjects);
};

/**
 * Fetches all notes for single project
 * @param {string} project Project ID
 * @return {Promise}
 */
export function requestNotesForProject (project, noteType) {
  return api(`notes?project=${project}&type=${noteType}`, receiveNotes);
};

/**
 * Fetch single user
 * @param {string} user ID of user
 */
export function fetchUser (user) {
  return api(`users/${CONFIG.userId}`, receiveUser);
};

/**
 * Delete project
 * @param {string} id Project ID
 */
export function deleteProject (id) {
  return api(`projects/${id}`, null, { method: 'DELETE' });
};