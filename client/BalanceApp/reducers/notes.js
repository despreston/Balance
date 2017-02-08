export default {

  /**
   * Replace note in specific project
   */
  RECEIVE_NOTE (state, { note }) {
    let projects;

    if (projects[note.project]) {
      projects[note.project][note.type] = note;
    }

    return Object.assign({}, state, projects);
  },

  /**
   * Set state property `notes`
   */
  RECEIVE_NOTES (state, { notes }) {
    return Object.assign({}, state, { notes });
  }

};