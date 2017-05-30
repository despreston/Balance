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

  createdAt: Date,

  lastUpdated: Date

});

Device.pre('save', function(next) {

  if (!this.createdAt) {
    this.createdAt = new Date();
  } else {
    delete this.createdAt;
  }

  this.lastUpdated = new Date();

  next();
});

module.exports = mongoose.model("device", Device);