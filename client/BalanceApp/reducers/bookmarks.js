export default {

  /**
   * add to `bookmarks`
   */
  RECEIVE_BOOKMARKS (state, { bookmarks }) {
    return Object.assign({}, state, {
      bookmarks: { ...state.bookmarks, ...bookmarks }
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