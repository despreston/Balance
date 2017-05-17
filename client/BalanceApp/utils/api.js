/* eslint no-console: "off" */
import convertDates from './convert-dates';
import { getAuthToken } from './auth';

/**
 * Sets up api calls.
 * @param {string} url
 * @param {object} properties Fetch properties. (Method, body, etc) Body should be regular JS object
 * @param {Bool} externalUrl True if the URL needs to point to something outside of Balance host
 */
export function api (url, properties = {}, externalUrl = false) {

  if (properties.body) {
    try {
      properties.body = JSON.stringify(properties.body);
    } catch (e) {
      console.log(e);
    }
  }
  
  return getAuthToken()
    .then(token => new Headers({ authorization: `Bearer ${token}` }))
    .then(headers => {
      properties.headers = headers;

      if (!externalUrl) {
        url = CONFIG.apiUrl + url;
      }

      return fetch(url, properties)
        .then(response => response.json())
        .then(json => convertDates(json))
        .catch(err => console.log("ERROR ", err));
    });
}

export function apiDispatch (url, action, properties = { method: 'GET' }) {
  return dispatch => {
    return api(url, properties)
      .then(result => {
        if (action) {
          return dispatch(action(result));
        }
      })
      .catch(err => console.log(err));
  };
}