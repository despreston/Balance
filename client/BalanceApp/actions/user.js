/* eslint no-console: "off" */
import { apiDispatch, api } from '../utils/api';
import { arrayToObj } from '../utils/helpers';
import Auth0Lock from 'react-native-lock';
import { saveAuthToken, saveRefreshToken } from '../utils/auth';
import Colors from '../components/colors';
import notificationActions from './notification';

const LOGGED_IN_USER = 'LOGGED_IN_USER';
const RECEIVE_USERS = 'RECEIVE_USERS';

export default {
  
  /**
   * @param {object} user
   * @return {action}
   */
  setLoggedInUser (user) {
    return { type: LOGGED_IN_USER, user };
  },

  /**
   * creates action for receiving users
   * @param {object} users (single) OR {array} users (multiple)
   * @return {action}
   */
  receiveUsers (users) {
    if (!Array.isArray(users)) {
      users = [users];
    }

    return {
      type: RECEIVE_USERS,
      users: arrayToObj(users, 'userId')
    };
  },

  /**
   * Save a user
   * Updates the user in Auth0 and on success it updates the user in Balance DB
   * Properly handles POST or PUT determination based on _new flag in note
   * @param {object} user
   * @return {Promise}
   */
  saveUser (user) {
    let method, url = 'users';

    if (user._new) {
      method = 'POST';
      delete user._new;
    } else {
      method = 'PUT';
      url += `/${user.userId}`;
    }

    return dispatch => {
      const encodedUserId = encodeURI(user.userId);
      const auth0url = `https://balanceapp.auth0.com/api/v2/users/${encodedUserId}`;

      let fields = (({ username, email }) => ({ username, email }))(user);

      fields.client_id = CONFIG.clientId;

      return api(auth0url, fields, true)
        .then(() => api(url, { method, body: user }))
        .then(user => dispatch(this.receiveUsers(user)))
        .catch(err => console.log('could not save user ', err));
    };
  },

  /**
   * Fetch user 
   * @param {string} userId of user
   */
  requestUser (user, loggedIn) {
    return apiDispatch(
      `users/${user}`,
      loggedIn ? this.setLoggedInUser : this.receiveUsers
    );
  },

  /**
   * prompt for log-in and send new user to server
   */
  login () {
    const { clientId, domain } = CONFIG;

    const style = {
      ios: {
        screenBackgroundColor: Colors.purple,
        closeButtonTintColor: Colors.white,
        primaryButtonNormalColor: Colors.green,
        textFieldTextColor: Colors.gray.tundora,
        textFieldIconColor: Colors.purple,
        titleTextColor: Colors.white,
        credentialBoxBorderColor: Colors.purple,
        credentialBoxSeparatorColor: Colors.purple,
        credentialBoxBackgroundColor: Colors.white,
        secondaryButtonTextColor: Colors.white,
        descriptionTextColor: Colors.white,
        separatorTextColor: Colors.white
      }
    };

    const lock = new Auth0Lock({ clientId, domain, style });
    const authParams = { scope: 'openid offline_access', device: 'my-device' };

    // show lock screen to prompt for login details
    return dispatch => {
      lock.show({ closable: true, authParams }, (err, profile, tokens) => {
        if (!tokens) {
          return;
        }

        if (err) {
          console.log('something went wrong ' + err);
        }

        // save tokens to local storage
        return saveRefreshToken(tokens.refreshToken)
        .then(() => saveAuthToken(tokens.idToken))
        .then(() => {

          if (profile.extraInfo && profile.extraInfo.picture_large) {
            profile.picture = profile.extraInfo.picture_large;
          }

          delete profile.extraInfo;

          // send the user to the server
          return api(`users`, { method: 'POST', body: profile })
            .then(user => {
              dispatch(notificationActions.fetchNotifications());
              dispatch(this.setLoggedInUser(user));
            });
        })
        .catch( err => {
          console.log('could not save new user ', err);
        });
      });
    }
  },

  /**
   * fetch friends for userId
   * @param {string} userId
   */
  fetchFriendsForUser (userId) {
    return apiDispatch(`users/${userId}/friends`, this.receiveUsers);
  },

  /**
   * Create a friend request. Server will figure out what the status should be.
   * @param {String} userId User requesting a friendship
   * @param {String} friend Target user
   */
  createFriendship (userId, friend) {
    const opts = { method: 'POST' };

    return apiDispatch(`users/${userId}/friends/${friend}`, this.receiveUsers, opts);
  },

  /**
   * Remove a friendship
   * @param {String} userId User requesting to remove the friendship
   * @param {String} friend Target user to remove
   */
  removeFriendship (userId, friend) {
    const opts = { method: 'DELETE' };

    return apiDispatch(`users/${userId}/friends/${friend}`, this.receiveUsers, opts);
  }

};