import { api } from '../utils/api';

export default {

  /**
   * Save device
   * @param {string} deviceToken
   * @return {Promise}
   */
  saveDevice (deviceToken) {
    return () => api('devices', { method: 'POST', body: deviceToken });
  }

};