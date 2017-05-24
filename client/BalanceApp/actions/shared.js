const RESET = 'RESET';
const CONNECT_TO_PIPER = 'CONNECT_TO_PIPER';
const DISCONNECT_FROM_PIPER = 'DISCONNECT_FROM_PIPER';

export default {

  /**
   * resets redux to the initial state
   */
  reset () {
    return {
      type: RESET
    };
  },

  /**
   * @param {string} user The userId of the user to connect to piper
   * @return {object}
   */
  connectToPiper (user) {
    return {
      type: CONNECT_TO_PIPER,
      url: CONFIG.piperSocket,
      user
    };
  },

  /**
   * @param {string} user The userId of the user to disconnect from piper
   * @return {object}
   */
  disconnectFromPiper (user) {
    return {
      type: DISCONNECT_FROM_PIPER,
      url: CONFIG.piperSocket,
      user
    };
  }

};