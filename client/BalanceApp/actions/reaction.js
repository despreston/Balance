import { api } from '../utils/api';

export const REMOVE_REACTION = 'REMOVE_REACTION';
export const UPDATE_REACTIONS = 'UPDATE_REACTIONS';

export default {

  /**
   * removes a single reaction
   * @param {String} reaction The _id of the reaction to remove
   * @param {String} note The _id of the note
   * @return {action}
   */
  removeReaction (reaction, note) {
    return {
      type: REMOVE_REACTION,
      reaction,
      note
    };
  },

  /**
   * Replaces all reactions in a note
   * @param {String} note The _id of the note
   * @param {Array} reactions
   * @return {Promise}
   */
  updateReactions (note, reactions) {
    return {
      type: UPDATE_REACTIONS,
      note,
      reactions
    };
  },

  /**
   * Add a reaction to a note
   * @param {String} reaction
   * @param {String} note The _id of the note
   * @param {Promise}
   */
  addReaction (reaction, note) {
    const opts = { body: { reaction }, method: 'POST' };

    return dispatch => {
      return api(`notes/${note}/reactions`, opts)
        .then(response => {
          return dispatch(this.updateReactions(response._id, response.reactions))
        });
    };
  },

  /**
   * Delete a reaction
   * @param {String} reaction The _id of the reaction to remove
   * @param {String} note The _id of the note
   * @param {Promise}
   */
  deleteReaction (reaction, note) {
    const opts = { method: 'DELETE' };

    return dispatch => {
      return api(`reactions/${reaction}`, opts)
        .then(() => dispatch(this.removeReaction(reaction, note)));
    };
  }

};