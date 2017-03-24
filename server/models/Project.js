'use strict';
const mongoose = require("mongoose");
const Note = require("./Note");
const privacyLevel = require('./shared/privacy-level');

let Project = new mongoose.Schema({

  title: {
    required: true,
    type: String
  },

  user: String,

  lastUpdated: Date,

  createdAt: Date,

  privacyLevel: privacyLevel,

  status: {
    required: true,
    type: String,
    default: 'active',
    enum: ['active', 'finished']
  },

  nudges: [{
    userId: {
      type: String,
      required: true
    },
    sentAt: {
      type: Date,
      required: true
    }
  }]
  
}, { 
  toObject: { virtuals: true }
});

/**
 * Ref to users that have nudged the project
 */
Project.virtual('nudgeUsers', {
  ref: 'user',
  localField: 'nudges.userId',
  foreignField: 'userId'
});

/**
 * Ref to latest Past note for Project
 */
Project.virtual('Past', {
  ref: 'note',
  localField: '_id',
  foreignField: 'project'
});

/**
 * Ref to latest Future note for Project
 */
Project.virtual('Future', {
  ref: 'note',
  localField: '_id',
  foreignField: 'project'
});

/**
 * Mongoose populate query for latest note of type 'Past'
 */
Project.statics.latestPastNote = {
  path: 'Past',
  match: { type: 'Past' },
  options: { sort: { createdAt: -1 }, limit: 1 }
};

/**
 * Mongoose populate query for latest note of type 'Future'
 */
Project.statics.latestFutureNote = {
  path: 'Future',
  match: { type: 'Future' },
  options: { sort: { createdAt: -1 }, limit: 1 }
};

/**
 * # of projects that belong to user
 * @param {String} userId User to get counts for
 * @return {Promise} resolves with integer
 */
Project.statics.projectCountForUser = function (userId) {
  return this.count({ user: userId, status: 'active' }, (err, count) => {
    if (err) {
      return Promise.reject('Could not get projects for user, ', userId);
    }
    
    return count;
  });
};

/**
 * Transforms the project ID in project.Note and project.Future to a full object
 * that contains the project title, _id, and privacyLevel.
 * e.g. { Past: { project: <ID> } } --> 
 *      { Past: { project: { _id, title, privacyLevel } } }
 *
 * @param {Array} or {Object} array of projects or a single project object
 * @return {Array} or {Object} depending on input 
 */
Project.statics.augmentNotesWithProject = function (projects) {

  function transform (p) {
    let fullObject = { 
      _id: p._id,
      title: p.title,
      privacyLevel: p.privacyLevel
    };

    p.Past = p.Past.length > 0 ? p.Past[0] : null;
    p.Future = p.Future.length > 0 ? p.Future[0] : null;

    if (p.Past) {
      p.Past.project = fullObject;
    }

    if (p.Future) {
      p.Future.project = fullObject;
    }

    return p;
  }

  if (Array.isArray(projects)) {
    return projects.map(transform);
  }

  return transform(projects);
}

Project.pre('save', function (next) {

  if (!this.createdAt) {
    this.createdAt = new Date();
  } else {
    delete this.createdAt;
  }

  // Keep user from changing these properties indirectly
  const excludedProperties = ['lastUpdated', 'user'];
  excludedProperties.forEach(prop => delete this[prop]);
  
  this.lastUpdated = new Date();
  
  next();

});

Project.pre('remove', function (next) {

  // remove all notes for project
  Note
  .find({ project: this._id })
  .then(notes => notes.forEach(note => note.remove()));
  
  next();

});

module.exports = mongoose.model("project", Project);