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
   * Save device
   * POST if _new field exists, otherwise PUT
   * @param {Object} device
   * @return {Promise}
   */
  saveDevice (device) {
    let method, url = 'devices';

    if (device._new) {
      method = 'POST';
      delete device._new;
    } else {
      method = 'PUT';
      url += `/${device._id}`;
    }

    return apiDispatch(url, this.receiveDevices, { method, body: device });
  },

  /**
   * fetch devices
   * @return {Promise}
   */
  fetchDevices () {
    return apiDispatch(`devices`, this.receiveDevices);
  }

};