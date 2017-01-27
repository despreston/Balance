'use strict';

/*
 * action types
 */
export const RECEIVE_USER = 'RECEIVE_USER';
export const REQUEST_USER_FAILED = 'REQUEST_USER_FAILED';
export const REQUEST_PROJECTS = 'REQUEST_PROJECTS';
export const RECEIVE_PROJECTS = 'RECEIVE_PROJECTS';
export const RECEIVE_PROJECT = 'RECEIVE_PROJECT';
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

export function receiveProjects (json) {
  // Convert to date objecto
  json.forEach(project => {
    if (project.lastUpdated) {
      project.lastUpdated = new Date(project.lastUpdated);
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
    project: project,
    receivedAt: Date.now()
  };
};

export function receiveNote (note) {
  return {
    type: RECEIVE_NOTE,
    note: note,
    receivedAt: Date.now()
  };
};

export function saveProject (project) {
  return function (dispatch) {
    return fetch(`${CONFIG.apiUrl}projects/${project._id}`, { method: 'PUT', body: JSON.stringify(project) })
      .then(response => response.json())
      .then(json => dispatch(receiveProject(json)));
  }
};

export function saveNote (note) {
  return function (dispatch) {
    let method, url = `${CONFIG.apiUrl}notes`;
    if (note._new) {
      method = 'POST';
      delete note._new;
    } else {
      method = 'PUT';
      url += `/${note._id}`;
    }
    return fetch(url, { method: method, body: JSON.stringify(note)})
      .then(response => response.json())
      .then(json => dispatch(receiveNote(json)));
  }
};

export function fetchProject (project) {
  return function (dispatch) {
    return fetch(CONFIG.apiUrl + 'projects/' + project._id)
      .then(response => response.json())
      .then(json => dispatch(receiveProject(json)));
  }
};

export function fetchProjects () {
  return function (dispatch) {
    dispatch(requestProjects());
    return fetch(`${CONFIG.apiUrl}users/${CONFIG.userId}/projects`)
      .then(response => response.json())
      .then(json => dispatch(receiveProjects(json)));
  }
};