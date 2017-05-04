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
   * remove a note
   */
  REMOVE_NOTE (state, { note }) {
    let notes = Object.assign({}, state.notes);

    delete notes[note];

    return Object.assign({}, state, { notes });
  },

  /**
   * Replace all reactions in the note
   */
  UPDATE_REACTIONS (state, { note, reactions }) {
    let notes = Object.assign({}, state.notes);

    notes[note].reactions = reactions;

    return Object.assign({}, state, { notes });
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