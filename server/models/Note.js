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
    ref: 'project',
    required: true
  },

  user: {
    type: String,
    required: true
  },

  lastUpdated: Date,

  createdAt: Date,

  privacyLevel: privacyLevel
  
});

Note.pre('save', function(next) {

  if (!this.createdAt) {
    this.createdAt = new Date();
  } else {
    delete this.createdAt;
  }

  // Keep user from changing these properties indirectly
  const excludedProperties = ['lastUpdated', 'user', 'createdAt'];
  excludedProperties.forEach(prop => delete this[prop]);

  this.lastUpdated = new Date();

  next();
  
});

module.exports = mongoose.model("note", Note);