import { apiDispatch, api } from '../utils/api';
import { arrayToObj } from '../utils/helpers';
import formatQueryParams from '../utils/query-params';
import Auth0Lock from 'react-native-lock';
import { saveToken } from '../utils/auth';
import { invalidate } from './shared';

const RECEIVE_NOTES = 'RECEIVE_NOTES';

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
   * Save a note to server and invalidate the projects
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
      dispatch(invalidate('projects'));
      return api(url, { method, body: note })
        .then(user => dispatch(this.receiveNotes));
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
        let comments = [];

        if (note.comments) {
          note.comments.forEach(c => comments.push(c));
        }

        dispatch(this.receiveComments(comments));
        return dispatch(this.receiveNotes(note));
      })
      .catch(err => console.log(err));
    }
  }

};