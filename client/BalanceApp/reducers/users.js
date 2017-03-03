export default {

  /**
   * Set state property `current_user`
   */
  // RECEIVE_CURRENT_USER (state, { loggedInUser }) {
  //   return Object.assign({}, state, { loggedInUser });
  // },

  /**
   * Set `loggedInUser`
   */
  LOGGED_IN_USER (state, { loggedInUser }) {
    return Object.assign({}, state, { loggedInUser });
  },

  RESET_CURRENT_USER (state) {
    return Object.assign({}, state, { loggedInUser: null });
  }


};