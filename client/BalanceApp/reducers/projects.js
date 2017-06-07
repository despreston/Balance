import { arrayToObj } from '../utils/helpers';
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
      notes: { ...state.notes, ...notes }
    });
  },

  /**
   * remove a project and all related notes, comments, & notifications
   */
  REMOVE_PROJECT (state, { project }) {
    let projects = Object.assign({}, state.projects);
    let projectNotes = [];
    let projectComments = [];

    let notes = Object.keys(state.notes)
      .map(id => state.notes[id])
      .filter(n => {
        if (n.project._id !== project) {
          return true;
        }

        // record the project notes in order to delete all comments for these notes
        projectNotes.push(n._id);
        return false;
      });

    let comments = Object.keys(state.comments)
      .map(id => state.comments[id])
      .filter(c => {
        // comment belongs to a note that belongs to the project
        if (projectNotes.some(note => note._id === c.note)) {
          projectComments.push(c._id);
          return false;
        }

        return true;
      });

    let notifications = Object.keys(state.notifications)
      .map(id => state.notifications[id])
      .filter(notification => {
        if (notification.related) {
          return notification.related.every(r => {
            const relatedItemId = r.item._id;

            // notification related to project
            if (relatedItemId === project) {
              return false;
            }

            // notification related to a note that belongs to project
            if (projectNotes.some(note => note._id === relatedItemId)) {
              return false;
            }

            // notification related to a comment on a note that belongs to project
            if (projectComments.some(comment => comment._id === relatedItemId)) {
              return false;
            }
          });
        }

        return true;
      });

    delete projects[project];

    return Object.assign({}, state, {
      projects,
      notes: arrayToObj(notes, '_id'),
      notifications: arrayToObj(notifications, '_id'),
      comments: arrayToObj(comments, '_id')
    });
  }

};