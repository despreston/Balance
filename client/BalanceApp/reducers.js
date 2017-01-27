'use strict';

const initialState = {
	user: null,
  projects: []
};

function replaceNoteInProject (note, projects) {
  const projectIndex = projects.findIndex(project => note.project === project._id);
  if (projectIndex > -1) {
    projects[projectIndex][note.type] = note;
  }
  return projects;
}

function balance (state = initialState, action) {
  switch (action.type) {
    case "RECEIVE_PROJECTS":
      return Object.assign({}, state, { projects: action.projects });
    case "RECEIVE_USER":
      return Object.assign({}, state, { user: action.user });
    case "RECEIVE_NOTE":
      return Object.assign({}, state, { projects: replaceNoteInProject(action.note, state.projects) });
    default:
      return state;
  };
}

export default balance;