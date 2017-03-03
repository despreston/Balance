import convertDates from './convert-dates';
import { getToken } from './auth';

/**
 * Sets up api calls.
 * @param {string} url
 * @param {function} action Action to dispatch with json after the fetch
 * @param {object} properties Fetch properties. (Method, body, etc) Body should be regular JS object
 */
export function api (url, properties) {
  if (properties.body) {
    properties.body = JSON.stringify(properties.body);
  }
  return getToken()
    .then(token => new Headers({ authorization: `Bearer ${token}` }) )
    .then(headers => {
      properties.headers = headers;
      return fetch(`${CONFIG.apiUrl}${url}`, properties)
        .then(response => response.json())
        .then(json => json)
        .catch(err => console.log("ERROR ", err));
    });
};

export function apiDispatch (url, action, properties = { method: 'GET' }) {
  return dispatch => {
    return api(url, properties)
      .then(result => convertDates(result))
      .then(result => dispatch(action(result)))
      .catch(err => console.log(err));
  };
};