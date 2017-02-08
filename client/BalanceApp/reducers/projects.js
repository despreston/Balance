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

    const open_project = id
      ? state.projects[id]
      : emptyProject;

    return Object.assign({}, state, { open_project });
  }

};