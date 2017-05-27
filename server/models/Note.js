const mongoose = require('mongoose');
const Comment  = require('./Comment');
const Notification = require('./Notification');
const Reaction = require('./Reaction');

let Note = new mongoose.Schema({

  type: {
    required: true,
    type: String
  },

  content: String,

  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'project',
    required: true,
    index: true
  },

  user: {
    type: String,
    required: true,
    index: true
  },

  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'comment'
  }],

  reactions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'reaction'
  }],

  picture: String,

  lastUpdated: Date,

  createdAt: Date
  
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
});

Note.virtual('commentCount').get(function () {
  return this.comments.length;
});

/**
 * Ref to note author
 */
Note.virtual('author', {
  ref: 'user',
  localField: 'user',
  foreignField: 'userId',
  justOne: true
});

Note.pre('find', function () {
  this.populate('author', 'userId username picture');
});

Note.pre('findOne', function () {
  this.populate('author', 'userId username picture');
});

Note.pre('save', function(next) {
  if (!this.createdAt) {
    this.createdAt = new Date();
  } else {
    delete this.createdAt;
  }

  // Keep user from changing these properties indirectly
  const excludedProperties = ['lastUpdated', 'user', 'createdAt'];
  excludedProperties.forEach(prop => delete this[prop]);

  this.lastUpdated = new Date();

  next();
});

Note.pre('remove', function (next) {
  // remove all notifications related to the note
  Notification
  .find({ 'related.item': this._id })
  .then(notifications => notifications.forEach(n => n.remove()));

  // remove all comments for the note
  Comment
  .find({ 'note': this._id })
  .then(comments => comments.forEach(comment => comment.remove()));
  
  // remove all reactions for the note
  Reaction
  .find({ 'note': this._id })
  .then(reactions => reactions.forEach(reaction => reaction.remove()));

  next();
});

module.exports = mongoose.model("note", Note);
