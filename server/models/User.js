'use strict';
const mongoose = require("mongoose");

module.exports = mongoose.model("user", new mongoose.Schema({

  firstName: {
    required: true,
    type: String
  },

  lastName: {
    required: true,
    type: String
  },

  email: {
    index: true,
    required: true,
    type: String
  },

  lastUpdated: Date,

  createdAt: Date

}));