export default {

  /**
   * add to `notifications`
   */
  RECEIVE_NOTIFICATIONS (state, { notifications }) {
    return Object.assign({}, state, {
      notifications: { ...state.notifications, ...notifications }
    });
  }

};