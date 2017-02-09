export default {

  /**
   * Set state property `projects`
   */
  RECEIVE_PROJECTS (state, { projects }) {
    return Object.assign({}, state, { projects });
  },

  /**
   * Replace specific project
   */
  RECEIVE_PROJECT (state, { project }) {
    const projects = {
      ...state.projects,
      [project._id]: project
    };

    return Object.assign({}, state, { projects });
  }

};