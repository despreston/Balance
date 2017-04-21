import { apiDispatch } from '../utils/api';
import { arrayToObj } from '../utils/helpers';

const RECEIVE_NOTIFICATIONS = 'RECEIVE_NOTIFICATIONS';

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
   * creates action for marking all notifications as read
   * @return {object}
   */
  // read () {
  //   return { type: MARK_AS_READ }
  // },

  /**
   * fetch notifications
   * @return {Promise}
   */
  fetchNotifications () {
    return apiDispatch(`notifications`, this.receiveNotifications);
  },

  markAsRead () {
    const opts = { method: 'POST' };
    return apiDispatch('notifications/read', null, opts);
  }

};