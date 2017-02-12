'use strict';
const mongoose = require("mongoose");
const Note = require("./Note");
const privacyLevel = require('./shared/privacy-level');

let Project = new mongoose.Schema({

  title: {
    required: true,
    type: String
  },

  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'user'
  },

  lastUpdated: Date,

  createdAt: Date,

  privacyLevel: privacyLevel
  
});

/**
 * Finds projects and includes latest future and past notes for each project
 * @param {object} query Search query
 * @return {Promise}
 */
Project.statics.queryWithNotes = function (query) {
  function getLatestNotesForProjects (notes, projects) {
    notes.forEach(note => {
      const index = projects.findIndex(project => note.project.equals(project._id));
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
    return Note.find({project: { $in: projectIds }}).sort('-createdAt').lean().then(notes => {
      return getLatestNotesForProjects(notes, projects);
    });
  });
};

Project.pre('save', function(next) {
  // Keep user from changing these properties indirectly
  const excludedProperties = ['lastUpdated', 'user', 'createdAt'];
  excludedProperties.forEach(prop => delete this[prop]);
  this.lastUpdated = new Date();
  next();
});

module.exports = mongoose.model("project", Project);