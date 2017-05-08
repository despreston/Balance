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
   * fetch notifications
   * @return {Promise}
   */
  fetchNotifications () {
    return apiDispatch(`notifications`, this.receiveNotifications);
  },

  /**
   * mark all notifications as read
   */
  markAsRead () {
    const opts = { method: 'POST' };
    return apiDispatch('notifications/read', null, opts);
  }

};