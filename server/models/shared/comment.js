/**
 * Comment
 */

const mongoose = require('mongoose');

module.export = {

  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true
  },

  userId: {
    type: String,
    required: true
  },

  content: {
    type: String,
    required: true
  },

  createdAt: Date

};