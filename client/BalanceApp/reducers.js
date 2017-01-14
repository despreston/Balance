'use strict';

const initialState = {
	user: null,
  projects: []
};

function balance (state = initialState, action) {
  switch (action.type) {
    case "RECEIVE_PROJECTS":
      return Object.assign({}, state, { projects: action.projects });
    case "RECEIVE_USER":
      return Object.assign({}, state, { user: action.user });
    default:
      return state;
  };
}

export default balance;