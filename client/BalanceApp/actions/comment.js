import { apiDispatch, api } from '../utils/api';
import { arrayToObj } from '../utils/helpers';

const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
const REMOVE_COMMENT = 'REMOVE_COMMENT';

export default {

  /**
   * creates action for receiving comments
   * @param {object} comments (single) OR {array} comments (multiple)
   * @return {action}
   */
  receiveComments (comments) {
    if (!Array.isArray(comments)) {
      comments = [comments];
    }

    return {
      type: RECEIVE_COMMENTS,
      comments: arrayToObj(comments, '_id')
    };
  },

  /**
   * removes a single comment
   * @param {String} comment The _id of the comment to remove
   * @return {action}
   */
  removeComment (comment) {
    return {
      type: REMOVE_COMMENT,
      comment
    };
  },

  /**
   * Create a new comment
   * @param {Object} comment
   * @return {Promise}
   */
  createComment (comment) {
    const opts = { method: 'POST', body: comment };

    return apiDispatch(`comments`, this.receiveComments, opts);
  },

  /**
   * Remove a comment
   * @param {String} comment The _id of the comment
   * @return {Promise}
   */
  deleteComment (comment) {
    const opts = { method: 'DELETE' };

    return dispatch => {
      return api(`comments/${comment}`, opts)
        .then(result => {
          dispatch(this.removeComment(comment));
          return dispatch(this.receiveComments(result));
        });
    };
  }

};