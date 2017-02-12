'use strict';
const mongoose = require("mongoose");

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

  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'user'
  },

  lastUpdated: {
    type: Date,
    required: true
  },

  createdAt: {
    type: Date,
    required: true
  },

  // Potential values are [global, friends, private]
  privacyLevel: {
    required: true,
    type: String,
  }
  
});

Note.pre('save', function(next) {
  // Keep user from changing these properties indirectly
  const excludedProperties = ['lastUpdated', 'user', 'createdAt'];
  excludedProperties.forEach(prop => delete this[prop]);

  this.lastUpdated = new Date();

  next();
});

module.exports = mongoose.model("note", Note);