'use strict';

/*
 * action types
 */
export const RECEIVE_USER = "RECEIVE_USER";
export const REQUEST_USER_FAILED = "REQUEST_USER_FAILED";
export const REQUEST_PROJECTS = "REQUEST_PROJECTS";
export const RECEIVE_PROJECTS = "RECEIVE_PROJECTS";

/*
 * action creators
 */
export function receiveUser(user) {
	return { type: RECEIVE_USER, user };
};

export function requestUserFailed(err) {
  return { type: REQUEST_USER_FAILED, err };
};

export function requestProjects() {
  return { type: REQUEST_PROJECTS };
};

export function receiveProjects(json) {
  return {
    type: RECEIVE_PROJECTS,
    projects: json,
    receivedAt: Date.now()
  };
};

export function fetchProjects () {
  return function (dispatch) {
    dispatch(requestProjects());
    return fetch(CONFIG.apiUrl + 'projects')
      .then(response => response.json())
      .then(json => dispatch(receiveProjects(json)));
  }
};