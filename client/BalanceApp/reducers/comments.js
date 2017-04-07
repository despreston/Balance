export default {

  /**
   * add to `comments`
   */
  RECEIVE_COMMENTS (state, { comments }) {
    return Object.assign({}, state, {
      comments: { ...state.comments, ...comments }
    });
  },

  /**
   * remove a comment
   */
  REMOVE_COMMENT (state, { comment }) {
    let comments = Object.assign({}, state.comments);

    delete comments[comment];

    return Object.assign({}, state, { comments });
  }

};