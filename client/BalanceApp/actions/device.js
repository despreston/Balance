import { apiDispatch, api } from '../utils/api';
import { arrayToObj } from '../utils/helpers';

export default {

  /**
   * Save device
   * @param {string} deviceToken
   * @return {Promise}
   */
  saveDevice (deviceToken) {
    return dispatch => api('devices', { method: 'POST', body: deviceToken });
  }

};