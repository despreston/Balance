import projects from './projects';
import users from './users';
import notes from './notes';

const initialState = {
  users: {},
  sessionUserId: null,
  projects: [],
  notes: [],
  open_project: null
};

export default function reducer (state = initialState, action) {

  let handlers = Object.assign({}, projects, notes, users);
  
  if (!handlers[action.type]) {
    return state;
  }

  return handlers[action.type](state, action);

};