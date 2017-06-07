import projects      from './projects';
import users         from './users';
import notes         from './notes';
import comments      from './comments';
import notifications from './notifications';
import bookmarks     from './bookmarks';

const initialState = {
  // Users key'd by userId
  users: {},

  // Logged in user. If value is null, we know there is no one logged in
  // This is the userId from Auth0, not the ObjectID
  loggedInUser: null,

  // Projects key'd by _id
  projects: {},
  
  // Notes key'd by _id
  notes: {},

  // Comment key'd by _id
  comments: {},

  // notifications by _id
  notifications: {},

  // Set this to a notification _id to show that notification in the toaster
  notificationForToaster: null,

  // Bookmarks by _id
  bookmarks: {}
  
};

export default function reducer (state = initialState, action) {

  let handlers = Object.assign({},
    projects, notes, users, comments, notifications, bookmarks
  );

  if (action.type === 'RESET') {
    return Object.assign({}, initialState);
  }
  
  if (!handlers[action.type]) {
    return state;
  }

  return handlers[action.type](state, action);

}