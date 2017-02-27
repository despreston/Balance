export default {

  /**
   * Set state property `user`
   */
  RECEIVE_USER (state, { user }) {
    const users = {
      ...state.users,
      [user.userId]: user
    };

    return Object.assign({}, state, { users });
  },

  /**
   * Set `current_user`
   */
  SET_CURRENT_USER (state, { current_user }) {
    return Object.assign({}, state, { current_user });
  }


};