const mongoose = require("mongoose");
const privacyLevel = require('./shared/privacy-level');
const comment = require('./shared/comment');

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

  comments: [ comment ],

  lastUpdated: Date,

  createdAt: Date,

  privacyLevel: privacyLevel
  
});

/**
 * Ref to note author
 */
Note.virtual('author', {
  ref: 'user',
  localField: 'user',
  foreignField: 'userId'
});

Note.pre('find', function () {
  this.populate('author', 'userId username picture');
});

Note.pre('findOne', function () {
  this.populate('author', 'userId username picture');
});

/**
 * Adds a comment to a note
 * @param {Object} comment
 * @return {Promise} resolves with the updated note
 */
Note.methods.addComment = function (comment) {
  return new Promise ((resolve, reject) => {
    comment.createdAt = new Date();
    comment._id = new mongoose.Types.ObjectId();

    this.comments.push(comment);

    this.save(err => {
      if (err) {
        reject('Could not add comment');
      }

      this.populate('author', 'userId username picture', err => {
        if (err) {
          reject('Could not populate author');
        }

        resolve(this);
      });
    });
  });
};

/**
 * Removes a comment from the note
 * @param {String} comment The _id belonging to the comment to remove
 * @return {Promise} resolves with the updated note
 */
Note.methods.removeComment = function (comment) {
  return new Promise ((resolve, reject) => {
    const commentIdx = this.comments.findIndex(c => c._id === comment);

    if (commentIdx < 0) {
      reject('Comment does not exist');
    }

    this.comments.splice(commentIdx);

    this.save(err => {
      if (err) {
        reject('Could not remove comment');
      }

      resolve(this);
    });
  });
};

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
