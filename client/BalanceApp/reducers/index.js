import projects from './projects';
import users from './users';
import notes from './notes';

const initialState = {
  /**
   * Users key'd by _id
   */
  users: {},
  
  sessionUserId: null,

  /**
   * Projects key'd by _id
   */
  projects: {},
  
  /**
   * Notes key'd by _id
   */
  notes: {},
  
  open_project: null
};

export default function reducer (state = initialState, action) {

  let handlers = Object.assign({}, projects, notes, users);
  
  if (!handlers[action.type]) {
    return state;
  }

  return handlers[action.type](state, action);

};