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
      required: true,
      unique: true
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
 * Ref to project owner
 */
Project.virtual('owner', {
  ref: 'user',
  localField: 'user',
  foreignField: 'userId'
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

Project.statics.latestFutureNote = {
  path: 'Future',
  match: { type: 'Future' },
  options: { sort: { createdAt: -1 }, limit: 1 }
};

Project.statics.latestPastNote = {
  path: 'Past',
  match: { type: 'Past' },
  options: { sort: { createdAt: -1 }, limit: 1 }
};

/**
 * # of projects that belong to user
 * @param {String} userId User to get counts for
 * @return {Promise} resolves with integer
 */
Project.statics.projectCountForUser = function (userId) {
  return this.count({ user: userId }, (err, count) => {
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

};

/**
 * Adds a nudge to the project
 * @param {String} userId the userId of user that is nudging the project
 * @return {Promise} resolves with updated project
 */
Project.methods.addNudge = function (userId) {

  return new Promise((resolve, reject) => {
    this.nudges.push({ userId, sentAt: new Date() });

    this.save(err => {
      if (err) {
        reject('Could not add nudge');
      }

      // Get the updated list of nudgeUsers
      this.populate('nudgeUsers', 'userId picture', err => {
        if (err) {
          reject('Could not add nudge');
        }

        delete this.nudges;

        resolve(this);
      });
    });
  });

};

/**
 * Removes nudge from project
 * @param {String} userId the userId of the user who's nudge to remove
 * @return {Promise} resolves with updated project
 */
Project.methods.removeNudge = function (userId) {

  return new Promise((resolve, reject) => {
    const nudgeIdx = this.nudges.findIndex(n => n.userId === userId);

    if (nudgeIdx < 0) {
      reject('No nudge exists for that user');
    }

    this.nudges.splice(nudgeIdx);

    this.save(err => {
      if (err) {
        reject("Could not save project");
      }

      delete this.nudges;

      // need to remove from nudgeUsers since its outdated now
      this.nudgeUsers.splice(
        this.nudgeUsers.findIndex(u => u.userId === userId)
      );

      resolve(this);
    });
  });

};

Project.pre('find', function () {
  this.populate('owner', 'userId username');
});

Project.pre('findOne', function () {
  this.populate('owner', 'userId username');
});

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