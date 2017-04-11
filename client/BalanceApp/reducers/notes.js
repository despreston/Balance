export default {

  /**
   * add to `notes`
   */
  RECEIVE_NOTES (state, { notes }) {
    return Object.assign({}, state, {
      notes: { ...state.notes, ...notes }
    });
  },

  /**
   * remove a reaction from a note
   */
  REMOVE_REACTION (state, { note, reaction }) {
    let notes = Object.assign({}, state.notes);

    notes[note].reactions = notes[note].reactions.filter(r => r._id !== reaction);

    return Object.assign({}, state, { notes });
  }

};