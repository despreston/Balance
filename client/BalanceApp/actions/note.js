/* eslint no-console: "off" */
import { apiDispatch, api } from '../utils/api';
import { arrayToObj } from '../utils/helpers';
import formatQueryParams from '../utils/query-params';

const RECEIVE_NOTES = 'RECEIVE_NOTES';
const REMOVE_NOTE = 'REMOVE_NOTE';

export default {

  /**
   * Create action for receiving new list of notes
   * @param {object} notes (single) OR {array} notes (multiple)
   * @param {action}
   */
  receiveNotes (notes) {
    if (!Array.isArray(notes)) {
      notes = [notes];
    }

    return {
      type: RECEIVE_NOTES,
      notes: arrayToObj(notes, '_id')
    };
  },

  /**
   * removes a single note
   * @param {String} note The _id of the note to remove
   * @return {action}
   */
  removeNote (note) {
    return {
      type: REMOVE_NOTE,
      note
    };
  },

  /**
   * Save a note
   * Properly handles POST or PUT determination based on _new flag in note
   * @param {object} note
   * @return {Promise}
   */
  saveNote (note) {
    let method, url = 'notes';

    if (note._new) {
      method = 'POST';
      delete note._new;
    } else {
      method = 'PUT';
      url += `/${note._id}`;
    }

    return dispatch => {
      return api(url, { method, body: note })
      .then(note => dispatch(this.receiveNotes(note)));
    };
  },

  /**
   * Fetch notes
   * @param {array} params key/val object pairs. key = param, value = param value
   * @return {Promise}
   */
  requestNotes (params) {
    return apiDispatch(`notes${formatQueryParams(params)}`, this.receiveNotes);
  },

  /**
   * Fetch single note
   * @param {String} id Note ID
   * @return {Promise}
   */
  fetchNote (id) {
    return dispatch => {
      return api(`notes/${id}`)
      .then(note => {
        if (note.comments) {
          dispatch(this.receiveComments(note.comments));
        }

        return dispatch(this.receiveNotes(note));
      })
      .catch(err => console.log(err));
    }
  },

  /**
   * Fetches global activity
   */
  fetchGlobalActivity (params) {
    return apiDispatch(`notes/global_activity${formatQueryParams(params)}`, this.receiveNotes);
  },

  /**
   * Fetches friends activity
   */
  fetchFriendActivity (params) {
    return apiDispatch(`notes/friend_activity${formatQueryParams(params)}`, this.receiveNotes);
  },

  /**
   * Remove a note
   * @param {String} note The _id of the note
   * @return {Promise}
   */
  deleteNote (note) {
    const opts = { method: 'DELETE' };

    return dispatch => {
      return api(`notes/${note}`, opts)
        .then(result => {
          dispatch(this.removeNote(note));
          return dispatch(this.receiveNotes(result));
        });
    };
  },

  /**
   * Deletes a picture from a note
   * @param {string} id The _id of the note
   * @return {promise}
   */
  deletePictureFromNote (id) {
    return dispatch => {
      return api(`notes/${id}/picture`, { method: 'DELETE' })
      .then(note => {
        if (note.comments) {
          dispatch(this.receiveComments(note.comments));
        }
        return dispatch(this.receiveNotes(note));
      })
      .catch(err => console.log(err));
    };
  }

};