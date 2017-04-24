const RESET = 'RESET';
const INVALIDATE_PROJECTS = 'INVALIDATE_PROJECTS';

export default {

  /**
   * Marks collection as invalidated to flag that a fetch is needed
   * @param {string} collection
   * @return {action} 
   */
  invalidate (collection) {
    const invalidateProp = {
      projects: INVALIDATE_PROJECTS
    };

    if (!invalidateProp[collection]) {
      throw `Can't validate ${collection}`;
    }

    return { type: invalidateProp[collection] };
  },

  /**
   * resets redux to the initial state
   */
  reset () {
    return {
      type: RESET
    };
  }

};