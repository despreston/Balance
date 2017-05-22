export default {

  /**
   * add to `notifications`
   */
  RECEIVE_NOTIFICATIONS (state, { notifications }) {
    return Object.assign({}, state, {
      notifications: { ...state.notifications, ...notifications }
    });
  },

  /**
   * set notificationForToaster
   */
  SHOW_NOTIFICATION_TOASTER (state, { id }) {
    return Object.assign({}, state, { notificationForToaster: id });
  }

};