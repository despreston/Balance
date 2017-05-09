const RESET = 'RESET';
const CONNECT_TO_PIPER = 'CONNECT_TO_PIPER';

export default {

  /**
   * resets redux to the initial state
   */
  reset () {
    return {
      type: RESET
    };
  },

  connectToPiper (user) {
    return {
      type: CONNECT_TO_PIPER,
      url: CONFIG.piperSocket,
      user
    }
  }

};