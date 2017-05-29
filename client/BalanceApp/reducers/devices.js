export default {

  /**
   * add to `devices`
   */
  RECEIVE_DEVICES (state, { devices }) {
    return Object.assign({}, state, {
      devices: { ...state.devices, ...devices }
    });
  }

};