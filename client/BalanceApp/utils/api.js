/* eslint no-console: "off" */
import convertDates from './convert-dates';
import { getAuthToken } from './auth';

/**
 * Sets up api calls.
 * @param {string} url
 * @param {object} properties Fetch properties. (Method, body, etc) Body should be regular JS object
 * @param {Bool} externalUrl True if the URL needs to point to something outside of Balance host
 */
export async function api (url, properties = {}, externalUrl = false) {

  if (properties.body) {
    try {
      properties.body = JSON.stringify(properties.body);
    } catch (e) {
      console.log('Error stringifying body of request: ', e);
    }
  }

  try {
    const token = await getAuthToken();
    properties.headers = new Headers({ authorization: `Bearer ${token}` });

    if (!externalUrl) {
      url = CONFIG.apiUrl + url;
    }

    const response = await fetch(url, properties);

    if (!response.ok) {
      throw 'Response status ' + response.status;
    }

    if (response.status === 204) {
      return;
    }

    const json = await response.json();

    return convertDates(json);
  } catch (e) {
    console.warn(
      `Error in api.js#api while requesting ${url} with properties:
      ${JSON.stringify(properties, null, 2)}.
      Error: ${e}`
    );
    throw e;
  }
}

export function apiDispatch (url, action, properties = { method: 'GET' }) {
  return async dispatch => {
    try {
      const result = await api(url, properties);

      if (action) {
        return dispatch(action(result));
      }
    } catch (e) {
      console.warn(`
        Error in api.js#apiDispatch while requesting ${url} with properties:
        ${JSON.stringify(properties, null, 2)}.
        Error ${e}
      `);
      throw e;
    }
  };
}
