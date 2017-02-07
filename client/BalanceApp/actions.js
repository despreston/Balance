import { api } from './middleware/api';

/*
 * action types
 */
export const RECEIVE_USER = 'RECEIVE_USER';
export const REQUEST_USER_FAILED = 'REQUEST_USER_FAILED';

export const REQUEST_PROJECTS = 'REQUEST_PROJECTS';
export const RECEIVE_PROJECTS = 'RECEIVE_PROJECTS';
export const RECEIVE_PROJECT = 'RECEIVE_PROJECT';
export const OPEN_PROJECT = 'OPEN_PROJECT';

export const RECEIVE_NOTE = 'RECEIVE_NOTE';
export const RECEIVE_NOTES_FOR_PROJECT = 'RECEIVE_NOTES_FOR_PROJECT';

/*
 * action creators
 */
export function receiveUser (user) {
	return { type: RECEIVE_USER, user };
};

export function requestUserFailed (err) {
  return { type: REQUEST_USER_FAILED, err };
};

export function requestProjects () {
  return { type: REQUEST_PROJECTS };
};

/**
 * Set the project that is being viewed
 * @param {string} id Project ID
 */
export function openProject (id = null) {
  return { type: OPEN_PROJECT, id };
};

/**
 * Receive projects and convert dates to date objects
 * @param {json} json
 * @return {action}
 */
export function receiveProjects (json) {
  // Convert to date object
  json.forEach(project => {
    if (project.lastUpdated) {
      project.lastUpdated = new Date(project.lastUpdated);
    }
    if (project.Future) {
      project.Future.lastUpdated = new Date(project.Future.lastUpdated);
    }
    if (project.Past) {
      project.Past.lastUpdated = new Date(project.Past.lastUpdated);
    }
  });
  
  return {
    type: RECEIVE_PROJECTS,
    projects: json,
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
 * Create action for receiving a single note
 * @param {object} note
 * @return {action}
 */
export function receiveNote (note) {
  if (note.lastUpdated) {
    note.lastUpdated = new Date(note.lastUpdated);
  }
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
 * Fetches all projects for current user
 * @return {Promise}
 */
export function fetchProjects () {
  return api(`users/${CONFIG.userId}/projects`, receiveProjects);
};

/**
 * Fetches all notes for single project
 * @param {string} project Project ID
 * @return {Promise}
 */
export function requestNotesForProject (project) {
  return api(`projects/${project}/notes`, receiveNotesForProject);
};

/**
 * Fetch single user
 * @param {string} user ID of user
 */
 // export function fetchUser (user) {
  
 // }