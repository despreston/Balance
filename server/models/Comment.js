const mongoose = require('mongoose');
const log = require('logbro');

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

Comment.pre('remove', async function(next) {
  try {
    const notifications = await mongoose.models['notification']
      .find({ 'related.item': this._id });

    await Promise.all(notifications.map(n => n.remove()));

    next();
  } catch (e) {
    log.error(`Could not erase dependencies for comment ${this._id}: ${e}`);
  }
  // remove related notifications
  // return mongoose.models['notification']
  // .find({ 'related.item': this._id })
  // .then(notifications => Promise.all(notifications.map(n => n.remove())))
  // .then(() => next());

});

Comment.post('remove', function(comment, next) {

  // Remove the comment from the Note
  mongoose.models['note']
  .update(
    { _id: comment.note },
    { $pull: { comments: comment._id } }
  ).exec();

  next();
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