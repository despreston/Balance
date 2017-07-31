export default {

  /**
   * add to `comments`
   * sweeps and clears all comments marked with _temp flag
   */
  RECEIVE_COMMENTS (state, { comments }) {
    let commentsCopy = Object.assign({}, state.comments);

    Object.keys(commentsCopy).forEach(id => {
      if (commentsCopy[id]._temp) {
        delete commentsCopy[id];
      }
    });

    return Object.assign({}, state, {
      comments: { ...commentsCopy, ...comments }
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
