const mongoose = require('mongoose');

let Device = new mongoose.Schema ({

  userId: {
    type: String,
    required: true
  },

  deviceToken: {
    type: String,
    required: true
  },

  lastUpdated: Date

});

module.exports = mongoose.model("device", Device);