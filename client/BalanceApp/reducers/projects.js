export default {

  /**
   * Set state property `projects`
   */
  RECEIVE_PROJECTS (state, { projects }) {
    return Object.assign({}, state, { projects });
  },

  /**
   * Set store property `open_project`
   */
  OPEN_PROJECT (state, { id }) {
    const emptyProject = {
      _new: true,
      title: '',
      user: CONFIG.userId
    };

    let open_project, notes;

    if (id) {
      open_project = state.projects[id];
      notes = state.notes;
    } else {
      open_project = emptyProject;
      notes = {};
    }

    return Object.assign({}, state, { open_project, notes } );
  }

};