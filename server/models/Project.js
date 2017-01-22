'use strict';
const mongoose = require("mongoose");

let Project = new mongoose.Schema({
  title: {
    required: true,
    type: String
  },
  previousNote: {
    type: String
  },
  futureNote: {
    type: String
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'user'
  },
  lastUpdated: Date
});

Project.pre('save', function(next) {
  this.lastUpdated = new Date();
  next();
});

module.exports = mongoose.model("project", Project);