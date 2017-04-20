import { apiDispatch, api } from '../utils/api';
import { arrayToObj } from '../utils/helpers';

const RECEIVE_NOTIFICATIONS = 'RECEIVE_NOTIFICATIONS';

export default {

  /**
   * creates action for receiving notifications
   * @param {object} notifications (single) OR {array} notifications (multiple)
   * @return {action}
   */
  receiveNotifications (notifications) {
    if (!Array.isArray(notifications)) {
      notifications = [notifications];
    }

    return {
      type: RECEIVE_NOTIFICATIONS,
      notifications: arrayToObj(notifications, '_id')
    };
  }

};