export default {

  /**
   * add to `notes`
   * sweeps and clears all notes marked with _temp = true flag.
   */
  RECEIVE_NOTES (state, { notes }) {
    let notesCopy = Object.assign({}, state.notes);

    Object.keys(notesCopy).forEach(id => {
      if (notesCopy[id]._temp) {
        delete notesCopy[id];
      }
    });

    return Object.assign({}, state, {
      notes: { ...notesCopy, ...notes }
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
