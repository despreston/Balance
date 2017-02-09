export default {

  /**
   * Set state property `user`
   */
  RECEIVE_USER (state, { user }) {
    return Object.assign({}, state, { user });
  }

};