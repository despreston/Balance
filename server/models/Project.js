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
    sentAt: Date
  }]
  
});

/**
 * Finds projects and includes latest future and past notes for each project
 * @param {object} query Search query
 * @return {Promise}
 */
Project.statics.queryWithNotes = function (query) {
  function getLatestNotesForProjects (notes, projects) {
    notes.forEach(note => {
      const index = projects.findIndex(project => {
        return note.project._id.equals(project._id);
      });

      if (index > -1) {
        if (!projects[index][note.type]) {
          projects[index][note.type] = note;
        }
      }
    });
    return projects;
  }

  return this.find(query).lean().then(projects => {
    const projectIds = projects.map(project => project._id);
    
    return Note
      .find({ project: { $in: projectIds } })
      .sort('-createdAt')
      .populate('project', 'title privacyLevel')
      .lean()
      .then(notes => getLatestNotesForProjects(notes, projects));
  });
};

Project.statics.projectCountForUser = function (userId) {
  return this.count({ user: userId, status: 'active' }, (err, count) => {
    if (err) {
      return Promise.reject('Could not get projects for user, ', userId);
    }
    
    return count;
  });
};

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