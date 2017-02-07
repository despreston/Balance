export default {

  RECEIVE_PROJECTS (state, { projects }) {
    console.log(projects)
    return Object.assign({}, state, { projects });
  },

  OPEN_PROJECT (state, { id }) {
    const emptyProject = {
      _new: true,
      title: '',
      user: CONFIG.userId
    };

    const open_project = id
      ? state.projects.find(project => project._id === id)
      : emptyProject;

    return Object.assign({}, state, { open_project });
  }

};