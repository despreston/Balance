export default {

  /**
   * add to `comments`
   */
  RECEIVE_COMMENTS (state, { comments }) {
    return Object.assign({}, state, {
      comments: { ...state.comments, ...comments }
    });
  }

};