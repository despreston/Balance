'use strict';

const initialState = {
	user: null,
  projects: [],
  open_project: null // Project shown in project detail page
};

function replaceNoteInProject (note, projects) {
  const projectIndex = projects.findIndex(project => note.project === project._id);
  if (projectIndex > -1) {
    projects[projectIndex][note.type] = note;
  }
  return projects;
}

function getProject (projects, id) {
  const emptyProject = {
    _new: true,
    title: '',
    user: CONFIG.userId
  };
  const test = id
    ? projects.find(project => project._id === id)
    : emptyProject;
  
  return test;
}

function balance (state = initialState, action) {
  switch (action.type) {
    case 'OPEN_PROJECT':
      return Object.assign({}, state, { open_project: getProject(state.projects, action.id)});
    case 'RECEIVE_PROJECTS':
      return Object.assign({}, state, { projects: action.projects });
    case 'RECEIVE_USER':
      return Object.assign({}, state, { user: action.user });
    case 'RECEIVE_NOTE':
      return Object.assign({}, state, { projects: replaceNoteInProject(action.note, state.projects) });
    default:
      return state;
  };
}

export default balance;