export default {

  /**
   * add to `projects`
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
      projects: { ...state.projects, ...projects },
      notes: { ...state.notes, ...notes },
      projects_invalidated: false
    });
  },

  /**
   * Mark projects as stale
   * This is used as a flag to reload projects collection
   */
  INVALIDATE_PROJECTS (state) {
    return Object.assign({}, state, { projects_invalidated: true });
  }

};