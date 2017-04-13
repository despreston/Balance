import { apiDispatch } from '../utils/api';
import { arrayToObj } from '../utils/helpers';
import { invalidate } from './shared';

const RECEIVE_PROJECTS = 'RECEIVE_PROJECTS';

export default {

  /**
   * Receive projects and convert dates to date objects
   * @param {json} json
   * @return {action}
   */
  receiveProjects (json) {
    if (!Array.isArray(json)) {
      json = [json];
    }

    return {
      type: RECEIVE_PROJECTS,
      projects: arrayToObj(json, '_id')
    };
  },

  /**
   * Save a project to server
   * Properly handles POST or PUT determination based on _new flag in project
   * @param {object} project
   * @return {Promise}
   */
  saveProject (project) {
    let method, url = 'projects';

    if (project._new) {
      method = 'POST';
      delete project._new;
    } else {
      method = 'PUT';
      url += `/${project._id}`;
    }

    delete project.Future;
    delete project.Past;

    return apiDispatch(url, this.receiveProjects, { method, body: project });
  },

  /**
   * Fetches single project from server
   * @param {string} project Project ID
   * @return {Promise}
   */
  fetchProject (project) {
    return apiDispatch(`projects/${project._id}`, this.receiveProjects);
  },

  /**
   * Adds a nudge to the project
   * @param {String} project Project ID
   * @return {Promise}
   */
  nudge (project) {
    const opts = { method: 'POST' };
    return apiDispatch(`projects/${project}/nudges/`, this.receiveProjects, opts);
  },

  /**
   * Adds a nudge to the project
   * @param {String} project Project ID
   * @param {String} user User ID of nudger
   * @return {Promise}
   */
  removeNudge (project, user) {
    const opts = { method: 'DELETE' };
    return apiDispatch(`projects/${project}/nudges/${user}`, this.receiveProjects, opts);
  },

  /**
   * Fetches projects
   * @return {Promise}
   */
  fetchProjectsForUser (userId) {
    return apiDispatch(`projects?user=${userId}`, this.receiveProjects);
  },

  /**
   * Delete project
   * @param {string} id Project ID
   */
  deleteProject (id) {
    return apiDispatch(`projects/${id}`, null, { method: 'DELETE' });
  }

};