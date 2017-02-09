/**
 * Sets up api calls.
 * @param {string} url
 * @param {function} action Action to dispatch with json after the fetch
 * @param {object} properties Fetch properties. (Method, body, etc) Body should be regular JS object
 */
export function api (url, action, properties = { method: 'GET' }) {
  if (properties.body) {
    properties.body = JSON.stringify(properties.body);
  }
  return function(dispatch) {
    return fetch(`${CONFIG.apiUrl}${url}`, properties)
      .then(response => {
        response.json().then(json => {
          if (!response.ok) {
            return Promise.reject(); 
          }
          return dispatch(action(json));
        });
      })
  }
}