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
  lastUpdated: Date,
  createdAt: Date
});

Note.pre('save', function(next) {
  this.lastUpdated = new Date();
  next();
});

module.exports = mongoose.model("note", Note);