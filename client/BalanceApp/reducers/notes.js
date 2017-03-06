export default {

  /**
   * Set state property `notes`
   */
  RECEIVE_NOTES (state, { notes }) {
    return Object.assign({}, state, {
      notes: { ...state.notes, notes }
    });
  }

};