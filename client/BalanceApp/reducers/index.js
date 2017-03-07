import projects from './projects';
import users from './users';
import notes from './notes';

const initialState = {
  // Users key'd by _id
  users: {},

  // Logged in user. If value is null, we know there is no one logged in
  // This is the userId from Auth0, not the ObjectID
  loggedInUser: null,

  // Projects key'd by _id
  projects: {},

  // if true, projects needs to be reloaded
  projects_invalidated: false,
  
  // Notes key'd by _id
  notes: {}
  
};

export default function reducer (state = initialState, action) {

  let handlers = Object.assign({}, projects, notes, users);
  
  if (!handlers[action.type]) {
    return state;
  }

  return handlers[action.type](state, action);

};