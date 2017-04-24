const RESET = 'RESET';

export default {

  /**
   * resets redux to the initial state
   */
  reset () {
    return {
      type: RESET
    };
  }

};