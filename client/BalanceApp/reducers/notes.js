function replaceNoteInProject (note, projects) {
  const projectIndex = projects.findIndex(project => note.project === project._id);
  if (projectIndex > -1) {
    projects[projectIndex][note.type] = note;
  }
  return projects;
}

export default {

  /**
   * Replace note in specific project
   */
  RECEIVE_NOTE (state, { note }) {
    return Object.assign({}, state, { projects: replaceNoteInProject(note, state.projects) });
  },

  /**
   * Set state property `notes`
   */
  RECEIVE_NOTES (state, { notes }) {
    return Object.assign({}, state, { notes });
  }

};