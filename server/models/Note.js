const mongoose = require("mongoose");
const privacyLevel = require('./shared/privacy-level');

let Note = new mongoose.Schema({

  type: {
    required: true,
    type: String
  },

  content: {
    type: String
  },

  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'project',
    required: true
  },

  user: {
    type: String,
    required: true
  },

  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'comment'
  }],

  reactions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'reaction'
  }],

  lastUpdated: Date,

  createdAt: Date,

  privacyLevel: privacyLevel
  
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

module.exports = mongoose.model("note", Note);
