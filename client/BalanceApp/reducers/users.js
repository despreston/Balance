export default {

  /**
   * Set `loggedInUser` and add to `users`
   */
  LOGGED_IN_USER (state, { user }) {
    const users = {
      ...state.users,
      [user.userId]: user
    };

    const loggedInUser = user.userId;

    return Object.assign({}, state, { loggedInUser, users });
  },

  RESET_CURRENT_USER (state) {
    return Object.assign({}, state, { loggedInUser: null });
  },

  /**
   * add to `users`
   */
  RECEIVE_USERS (state, { users }) {
    return Object.assign({}, state, {
      users: { ...state.users, ...users }
    });
  }

};