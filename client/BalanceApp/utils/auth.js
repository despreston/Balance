import { AsyncStorage } from 'react-native';

const AUTH_TOKEN = 'AUTH_TOKEN';

/**
 * Stores token in AsyncStorage
 * @param {string} JWT
 * @return {promise} resolves with error if there are any
 */
export function saveToken (token) {
  return AsyncStorage.setItem(AUTH_TOKEN, token);
};

/**
 * Gets token from AsyncStorage
 * @return {promise} resolves with (error, token)
 */
export function getToken () {
  return AsyncStorage.getItem(AUTH_TOKEN);
};

/**
 * Stores token in AsyncStorage
 * @param {string} JWT
 * @return {promise} resolves with error if there are any
 */
export function removeToken () {
  return AsyncStorage.removeItem(AUTH_TOKEN);
};

/**
 * Looks for token, verifies token has not expired
 * @return {promise} resolves with boolean
 */
export async function isLoggedIn () {
  try {
    let token = await getToken();
    let payload;

    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      payload = JSON.parse(payload);

      // Has the token expired? 
      return payload.exp > Date.now() / 1000;
    }

    return false;

  } catch (e) { Promise.reject(e); }
}