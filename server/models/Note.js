const mongoose = require("mongoose");
const privacyLevel = require('./shared/privacy-level');

let Note = new mongoose.Schema({

  type: {
    required: true,
    type: String
  },

  content: {
    type: String
  },

  project: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'project'
  },

  user: String,

  lastUpdated: Date,

  createdAt: Date,

  privacyLevel: privacyLevel
  
});

/**
 * Adds project name and _id to notes
 * @param {array} projects Should contain all projects for the notes array
 * @param {array} notes
 */
Note.statics.augmentWithProjectInfo = function (projects, notes) {
  return notes.map(note => {
    let match = projects.find(project => project._id.equals(note.project));

    if (match) {
      note.project = {
        _id: match._id,
        name: match.title
      };
    }
    return note;
  });
};

Note.pre('save', function(next) {
  // Keep user from changing these properties indirectly
  const excludedProperties = ['lastUpdated', 'user', 'createdAt'];
  excludedProperties.forEach(prop => delete this[prop]);

  this.lastUpdated = new Date();

  next();
});

module.exports = mongoose.model("note", Note);