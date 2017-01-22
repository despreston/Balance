'use strict';

/*
 * action types
 */
export const RECEIVE_USER = 'RECEIVE_USER';
export const REQUEST_USER_FAILED = 'REQUEST_USER_FAILED';
export const REQUEST_PROJECTS = 'REQUEST_PROJECTS';
export const RECEIVE_PROJECTS = 'RECEIVE_PROJECTS';
export const RECEIVE_PROJECT = 'RECEIVE_PROJECT';

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
  // Convert to date object
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
  console.log(project)
  return {
    type: RECEIVE_PROJECT,
    project: project,
    receivedAt: Date.now()
  };
};

export function saveProject (project) {
  return function (dispatch) {
    return fetch(CONFIG.apiUrl + 'projects/' + project._id, { method: 'PUT', body: JSON.stringify(project) })
      .then(response => response.json())
      .then(json => dispatch(receiveProject(json)));
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
    return fetch(CONFIG.apiUrl + 'projects')
      .then(response => response.json())
      .then(json => dispatch(receiveProjects(json)));
  }
};