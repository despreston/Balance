export default {

  /**
   * Set state property `user`
   */
  RECEIVE_USER (state, { user }) {
    return Object.assign({}, state, { user });
  },

  /**
   * Set `current_user`
   */
  SET_CURRENT_USER (state, { current_user }) {
    console.log("SETTING CURRENT USER", current_user)
    return Object.assign({}, state, { current_user });
  }


};