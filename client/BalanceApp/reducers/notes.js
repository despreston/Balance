export default {

  /**
   * Replace note in specific project
   */
  RECEIVE_NOTE (state, { note }) {
    const notes = {
      ...state.notes,
      [note._id]: note
    };

    return Object.assign({}, state, { notes });
  },

  /**
   * Set state property `notes`
   */
  RECEIVE_NOTES (state, { notes }) {
    return Object.assign({}, state, { notes });
  }

};