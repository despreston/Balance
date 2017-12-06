/* eslint no-console: "off" */
const jwtDecode = require('jwt-decode');
import { AsyncStorage } from 'react-native';
import formatQueryParams from './query-params';

const AUTH_TOKEN = 'AUTH_TOKEN';
const REFRESH_TOKEN = 'REFRESH_TOKEN';

/**
 * Stores the refresh token
 * @param {String} refreshToken
 * @return {Promise}
 */
export function saveRefreshToken (refreshToken) {
  return AsyncStorage.setItem(REFRESH_TOKEN, refreshToken);
}

/**
 * Stores token in AsyncStorage
 * @param {string} authToken id token
 * @return {promise} resolves with error if there are any
 */
export function saveAuthToken (authToken) {
  return AsyncStorage.setItem(AUTH_TOKEN, authToken);
}

/**
 * Gets id token from AsyncStorage
 * @return {promise} resolves with (error, id token)
 */
export function getAuthToken () {
  return AsyncStorage.getItem(AUTH_TOKEN);
}

/**
 * Gets the refresh token from AsyncStorage
 * @return {Promise} resolves w/ (error, refresh token)
 */
export function getRefreshToken () {
  return AsyncStorage.getItem(REFRESH_TOKEN);
}

/**
 * Removes id token in AsyncStorage
 * @return {promise}
 */
export function removeAuthToken () {
  return AsyncStorage.removeItem(AUTH_TOKEN);
}

/**
 * Removes the refresh token from AsyncStorage
 * @return {promise}
 */
export function removeRefreshToken () {
  return AsyncStorage.removeItem(REFRESH_TOKEN);
}

/**
 * If there is a refresh token, then the user is logged in.
 * @return {promise} resolves with boolean
 */
export async function isLoggedIn () {
  try {
    let token = await getRefreshToken();
    return !!token;
  } catch (e) {
    Promise.reject(e);
  }
}

/**
 * Parses the id token
 * @return the JSON-parsed token
 */
export async function parseToken () {
  try {
    let token = await getAuthToken();
    return jwtDecode(token);
  } catch (e) {
    console.log('Error parsing token', e);
  }
}

/**
 * Requests a new id_token using the refresh token, then saves the id_token
 * @return {Promise}
 */
export async function refreshIdToken () {
  const { clientId, domain } = CONFIG;

  try {
    let refresh_token = await getRefreshToken();

    let params = formatQueryParams([
      { client_id: clientId },
      { grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer' },
      { refresh_token },
      { api_type: 'app' }
    ]);

    const url =`https://${domain}/delegation${params}`;

    return fetch(url, { method: 'POST' })
      .then(response => response.json())
      .then(json => saveAuthToken(json.id_token))
      .catch(err => console.log('ERR: ', err));
  } catch (e) {
    console.log('ERROR refreshing id token ', e);
  }
}
