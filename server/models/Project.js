'use strict';
const mongoose = require("mongoose");
const Note = require("./Note");
const privacyLevel = require('./shared/privacy-level');

let Project = new mongoose.Schema({

  title: {
    required: true,
    type: String,
    trim: true
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
  }],

  description: {
    type: String,
    trim: true
  }
  
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
  options: { sort: { createdAt: -1 }, limit: 1 },
  populate: {
    path: 'reactions',
    select: 'userId reaction'
  }
};

Project.statics.latestPastNote = {
  path: 'Past',
  match: { type: 'Past' },
  options: { sort: { createdAt: -1 }, limit: 1 },
  populate: {
    path: 'reactions',
    select: 'userId reaction'
  }
};

/**
 * # of projects that belong to user
 * @param {String} userId User to get counts for
 * @param {array} privacyLevels Limit search to valid privacy levels
 * @return {Promise} resolves with integer
 */
Project.statics.projectCountForUser = function (userId, privacyLevels) {
  const query = { user: userId, privacyLevel: { $in: privacyLevels } };

  return this.count(query, (err, count) => {
    if (err) {
      return Promise.reject('Could not get projects for user, ', userId);
    }
    
    return count;
  });
};

/**
 * Transforms the project ID in project.Note and project.Future to a full object
 * that contains the project title, _id, and privacyLevel.
 *
 * @param {Object} project
 * @return {Object}
 */
function augmentNotesWithProject (p) {

    let fullObject = { 
      _id: p._id,
      title: p.title,
      privacyLevel: p.privacyLevel
    };

    p.Past = (p.Past && p.Past.length) > 0 ? p.Past[0] : null;
    p.Future = (p.Future && p.Future.length) > 0 ? p.Future[0] : null;

    if (p.Past) {
      p.Past.project = fullObject;
    }

    if (p.Future) {
      p.Future.project = fullObject;
    }

    return p;

}

/**
 * Appends the commentCount to each note
 * @param {Object} project
 * @return {Object}
 */
function commentCountForNotes (project) {

  function commentCount (noteFromProject) {
    let note = Object.assign({}, noteFromProject);

    if (!note.comments) {
      return;
    }

    note.commentCount = note.comments.length;
    delete note.comments;
    return note;
  }

  if (project.Past) {
    project.Past = commentCount(project.Past);
  }

  if (project.Future) {
    project.Future = commentCount(project.Future);
  }

  return project;

}

/**
 * commentCountForNotes and augmentNotesWithProject are mutually-exlusive as far
 * as things go now so this calls both of those. 
 * @param {Object} project
 * @return {Object}
 */
Project.statics.futureAndPastNotes = function (project) {
  return commentCountForNotes(augmentNotesWithProject(project));
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

Project.statics.removeExcludedFields = function (project) {
  let copy = Object.assign({}, project);

  delete copy.user;
  delete copy.nudges;

  return copy;
}

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