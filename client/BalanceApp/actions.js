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

export function receiveProject (project) {
  return {
    type: RECEIVE_PROJECT,
    project,
    receivedAt: Date.now()
  };
};

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

export function saveProject (project) {
  let method, url = `${CONFIG.apiUrl}projects`;
  if (project._new) {
    method = 'POST';
    delete project._new;
  } else {
    method = 'PUT';
    url += `/${project._id}`;
  }
  return api(url, receiveProject, { method: method, body: project });
};

export function saveNote (note) {
  let method, url = `${CONFIG.apiUrl}notes`;
  if (note._new) {
    method = 'POST';
    delete note._new;
  } else {
    method = 'PUT';
    url += `/${note._id}`;
  }
  return api(url, receiveNote, { method: method, body: note });
};

export function fetchProject (project) {
  return api(`${CONFIG.apiUrl}projects/${project._id}`, receiveProject);
};

export function fetchProjects () {
  return api(`${CONFIG.apiUrl}users/${CONFIG.userId}/projects`, receiveProjects);
};