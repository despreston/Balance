import { api }        from '../utils/api';
import { arrayToObj } from '../utils/helpers';
import ObjectId       from '../utils/object-id';

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

    const tempComment = {
      _id: ObjectId(),
      _temp: true,
      note: comment.note,
      createdAt: new Date(),
      commenter: {
        userId: comment.user,
        username: 'Saving...'
      },
      content: comment.content
    };

    return async dispatch => {
      try {
        dispatch(this.receiveComments(tempComment));
        const result = await api(`comments`, opts);
        return dispatch(this.receiveComments(result));
      } catch (e) {
        dispatch(this.removeComment(tempComment._id));
      }
    };
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
