const mongoose = require('mongoose');

let Bookmark = new mongoose.Schema ({

  userId: {
    type: String,
    required: true,
    index: true
  },

  project: {
    index: true
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'project'
  },

  createdAt: Date

});

Bookmark.pre('save', function(next) {

  if (!this.createdAt) {
    this.createdAt = new Date();
  } else {
    delete this.createdAt;
  }

  next();
});

module.exports = mongoose.model("bookmark", Bookmark);