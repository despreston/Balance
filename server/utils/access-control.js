const User = require('../models/User');

module.exports = {

  /**
   * Handles access control for getting a single entity (project, note, etc)
   *
   * if entity does not belong to logged-in user is not global, then reject if:
   * 1. privacyLevel is private
   * 2. users are not friends
   *
   * @param {String} owner userId of owner of requested entity
   * @param {String} requester userId of the user requesting access
   * @param {String} privacyLevel privacy level for the requested entity
   * @return {Promise} rejects if there is a permissions issue
   */
  single (owner, requester, privacyLevel) {

    if (typeof owner !== 'string') {
      throw ("owner needs to be a string");
    }
    if (typeof requester !== 'string') {
      throw ("requester needs to be a string");
    }
    if (typeof privacyLevel !== 'string') {
      throw ('privacyLevel needs to be a string');
    }
    
    return new Promise ((resolve, reject) => {

      if (owner !== requester && privacyLevel !== 'global') {
        
        if (privacyLevel === 'private') {
          reject('Permission denied');
        }

        User.areFriends(requester, owner).then(isFriend => {
          if (!isFriend) {
            reject('Permission denied');
          }
          resolve();
        });

      } else {
        resolve();
      }

    });
  },

  /**
   * Access control when requesting access to multiple entities for an owner
   *
   * If entities dont belong to the logged-in user,
   * check if the logged-in user is friends with the user.
   *
   * If they arent friends and privacyLevel filter is not specified,
   * send all 'global' entities for the user.
   *
   * If the users are not friends and the privacyLevel !== global,
   * reject the request
   *
   * @param {Object} query Request query
   * @param {String} requester userId of the user requesting access
   * @return {Promise} resolves with array of accessible privacy levels
   */
  many (query, requester) {

    if (typeof requester !== 'string') {
      throw ('requestor needs to be a String');
    }

    return new Promise ((resolve, reject) => {

      if (query.user === requester) {
        if (query.privacyLevel) {
          resolve([query.privacyLevel]);
        } else {
          resolve(['global', 'friends', 'private']);
        }
      }

      // requesting private entities that do not belong to logged-in user
      if (query.privacyLevel && query.privacyLevel === 'private') {
        reject("Can't view private entities for another user.");
      }

      User.areFriends(requester, query.user).then(isFriend => {
        if (!isFriend) {
          if (query.privacyLevel && query.privacyLevel !== 'global') {
            reject('Not friends');
          }
          resolve(['global']);
        } else {
          resolve(query.privacyLevel ? [query.privacyLevel] : ['friends', 'global']);
        }
      });

    });
  }

};