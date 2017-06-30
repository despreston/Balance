export default {

  /**
   * add to `bookmarks`
   * if the bookmarks include notes, add them to `notes`
   */
  RECEIVE_BOOKMARKS (state, { bookmarks }) {
    let notes = {};

    Object.keys(bookmarks).forEach(id => {
      let project = bookmarks[id];

      if (project.Future) {
        notes[project.Future._id] = project.Future;
      }

      if (project.Past) {
        notes[project.Past._id] = project.Past;
      }
    });

    return Object.assign({}, state, {
      bookmarks: { ...state.bookmarks, ...bookmarks },
      notes: { ...state.notes, ...notes }
    });
  },

  /**
   * remove a bookmark
   */
  REMOVE_BOOKMARK (state, { bookmark }) {
    let bookmarks = Object.assign({}, state.bookmarks);

    delete bookmarks[bookmark];

    return Object.assign({}, state, { bookmarks });
  }

};
