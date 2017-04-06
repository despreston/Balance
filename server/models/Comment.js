const mongoose = require('mongoose');
const Note = require('./Note');

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
  foreignField: 'userId',
  justOne: true
});

Comment.post('remove', function(comment, next) {

  // Remove the comment from the Note
  Note
  .findOne({ _id: comment.note })
  .then(note => {
    const idx = note.comments.findIndex(c => c._id === comment._id);
    note.comments.splice(idx);
    note.save();
    next();
  });

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