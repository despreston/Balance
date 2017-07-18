const mongoose = require('mongoose');

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
  return mongoose.models['notification']
  .find({ 'related.item': this._id })
  .then(notifications => Promise.all(notifications.map(n => n.remove())))
  .then(() => {
    // remove all reactions for the note
    return mongoose.models['reaction']
    .find({ 'note': this._id })
    .then(reactions => Promise.all(reactions.map(reaction => reaction.remove())))
  })
  .then(() => {
    // remove all comments for the note
    return mongoose.models['comment']
    .find({ 'note': this._id })
    .then(comments => Promise.all(comments.map(comment => comment.remove())));
  })
  .then(() => next());
});

module.exports = mongoose.model("note", Note);
