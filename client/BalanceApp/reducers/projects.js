export default {

  /**
   * Set state property `projects`
   * Project includes latest future and past note,
   * add those notes to the store
   */
  RECEIVE_PROJECTS (state, { projects }) {
    let notes = {};
    
    Object.keys(projects).forEach(id => {
      let project = projects[id];

      if (project.Future) {
        notes[project.Future._id] = project.Future;
      }

      if (project.Past) {
        notes[project.Past._id] = project.Past;
      }
    });

    return Object.assign({}, state, {
      projects,
      notes,
      projects_invalidated: false
    });
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
  },

  /**
   * Mark projects as stale
   * This is used as a flag to reload projects collection
   */
  INVALIDATE_PROJECTS (state) {
    return Object.assign({}, state, { projects_invalidated: true });
  }

};