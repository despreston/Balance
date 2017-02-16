export default {

  /**
   * Set state property `user`
   */
  RECEIVE_USER (state, { user }) {
    return Object.assign({}, state, { user });
  },

  /**
   * Set authentication
   */
  SET_AUTHENTICATION (state, { authenticated }) {
    return Object.assign({}, state, { authenticated });
  }

};