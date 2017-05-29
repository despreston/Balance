import { apiDispatch } from '../utils/api';
import { arrayToObj } from '../utils/helpers';

const RECEIVE_DEVICES = 'RECEIVE_DEVICES';

export default {

  /**
   * creates action for receiving devices
   * @param {object} devices (single) OR {array} devices (multiple)
   * @return {object}
   */
  receiveDevices (devices) {
    if (!Array.isArray(devices)) {
      devices = [devices];
    }

    return {
      type: RECEIVE_DEVICES,
      devices: arrayToObj(devices, '_id')
    };
  },

  /**
   * fetch devices
   * @return {Promise}
   */
  fetchDevices () {
    return apiDispatch(`devices`, this.receiveDevices);
  }

};