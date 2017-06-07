import { apiDispatch, api } from '../utils/api';
import { arrayToObj } from '../utils/helpers';

const RECEIVE_BOOKMARKS = 'RECEIVE_BOOKMARKS';
const REMOVE_BOOKMARK = 'REMOVE_BOOKMARK';

export default {

  /**
   * creates action for receiving bookmarks
   * @param {object} bookmarks (single) OR {array} bookmarks (multiple)
   * @return {action}
   */
  receiveBookmarks (bookmarks) {
    if (!Array.isArray(bookmarks)) {
      bookmarks = [bookmarks];
    }

    return {
      type: RECEIVE_BOOKMARKS,
      bookmarks: arrayToObj(bookmarks, '_id')
    };
  },

  /**
   * removes a single bookmark
   * @param {String} bookmark The _id of the bookmark to remove
   * @return {action}
   */
  removeBookmark (bookmark) {
    return {
      type: REMOVE_BOOKMARK,
      bookmark
    };
  },

  /**
   * create a new bookmark
   * @param {Object} bookmark
   * @return {Promise}
   */
  createBookmark (bookmark) {
    const opts = { method: 'POST', body: bookmark };
    return apiDispatch('bookmarks', this.receiveBookmarks, opts);
  },

  /**
   * delete an existing bookmark
   * @param {String} id The _id of the bookmark
   * @return {Promise}
   */
  deleteBookmark (id) {
    const opts = { method: 'DELETE' };
    return dispatch => {
      return api(`bookmarks/${id}`, opts)
        .then(result => {
          dispatch(this.removeBookmark(id));
          return dispatch(this.receiveBookmarks(result));
        });
    };
  },

  /**
   * If project is bookmarked, get the bookmark, otherwise get nothing
   * @param {String} project The _id of the project
   * @return {Promise}
   */
  bookmarkForProject (project) {
    return apiDispatch(`projects/${project}/bookmark`, this.receiveBookmarks);
  },

  /**
   * Request bookmarks for project
   * @param {String} id The _id of the project
   * @return {Promise}
   */
  bookmarksForProject (id) {
    return apiDispatch(`projects/${id}/bookmarks`, this.receiveBookmarks);
  }

};