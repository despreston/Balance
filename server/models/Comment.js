const mongoose = require('mongoose');

let Comment = new mongoose.Schema ({

  user: {
    type: String,
    required: true
  },

  content: {
    type: String,
    required: true
  },

  note: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'note'
  },

  createdAt: Date

}, {
  toObject: { virtuals: true }
});

/**
 * Ref to commenter
 */
Comment.virtual('commenter', {
  ref: 'user',
  localField: 'user',
  foreignField: 'userId'
});

Comment.pre('save', function(next) {

  if (!this.createdAt) {
    this.createdAt = new Date();
  } else {
    delete this.createdAt;
  }

  next();
  
});

module.exports = mongoose.model("comment", Comment);