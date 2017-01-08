'use strict';
const mongoose = require("mongoose");

module.exports = mongoose.model("project", new mongoose.Schema({
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
}));