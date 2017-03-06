export default {

  /**
   * Set `loggedInUser` and add to `users`
   */
  LOGGED_IN_USER (state, { loggedInUser }) {
    const users = {
      ...state.users,
      [loggedInUser.userId]: loggedInUser
    };

    const loggedInUser = loggedInUser.userId;

    return Object.assign({}, state, { loggedInUser, users });
  },

  RESET_CURRENT_USER (state) {
    return Object.assign({}, state, { loggedInUser: null });
  }

};