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
   * Set `current_user` and appends user to users object
   */
  LOGGED_IN_USER (state, { user }) {

    const users = {
      ...state.users,
      [user.userId]: user
    };

    return Object.assign({}, state, { users, current_user: user.userId });
  },

  RESET_USER (state) {
    return Object.assign({}, state, { current_user: null });
  }


};