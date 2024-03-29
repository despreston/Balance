import { apiDispatch, api } from '../utils/api';
import { arrayToObj } from '../utils/helpers';
import { PushNotificationIOS } from 'react-native';

const RECEIVE_NOTIFICATIONS = 'RECEIVE_NOTIFICATIONS';
const SHOW_NOTIFICATION_TOASTER = 'SHOW_NOTIFICATION_TOASTER';
const CLEAR_NOTIFICATIONS = 'CLEAR_NOTIFICATIONS';

export default {

  /**
   * creates action for receiving notifications
   * @param {object} notifications (single) OR {array} notifications (multiple)
   * @return {object}
   */
  receiveNotifications (notifications) {
    if (!Array.isArray(notifications)) {
      notifications = [notifications];
    }

    return {
      type: RECEIVE_NOTIFICATIONS,
      notifications: arrayToObj(notifications, '_id')
    };
  },

  /**
   * @param {string} id _id of the notification to display in the toaster
   * @return {object}
   */
  showNotificationToaster (id) {
    return {
      type: SHOW_NOTIFICATION_TOASTER,
      id
    };
  },

  /**
   * CLEAR_NOTIFICATIONS action creator
   */
  clearNotificationsFromRedux () {
    return {
      type: CLEAR_NOTIFICATIONS
    };
  },

  /**
   * fetch notifications
   * @return {Promise}
   */
  fetchNotifications () {
    return dispatch => {
      return api('notifications')
        .then(notifications => {
          dispatch(this.clearNotificationsFromRedux());
          return dispatch(this.receiveNotifications(notifications));
        });
    };
  },

  /**
   * mark all notifications as read
   */
  markAsRead () {
    PushNotificationIOS.setApplicationIconBadgeNumber(0);
    const opts = { method: 'POST' };
    return apiDispatch('notifications/read', null, opts);
  },

  /**
   * Deletes all notifications
   */
  clearNotifications () {
    const opts = { method: 'POST' };
    return apiDispatch('notifications/clear', this.clearNotificationsFromRedux, opts);
  }

};