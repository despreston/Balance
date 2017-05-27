const mongoose = require('mongoose');
const Note = require('./Note');
const Notification = require('./Notification');

let Reaction = new mongoose.Schema ({

  userId: {
    type: String,
    required: true
  },

  reaction: {
    type: String,
    required: true
  },

  note: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'note'
  },

  createdAt: Date

});

/**
 * Ref to user
 */
Reaction.virtual('user', {
  ref: 'user',
  localField: 'userId',
  foreignField: 'userId',
  justOne: true
});

Reaction.post('remove', function(reaction, next) {

  // Remove the reaction from the Note. Using 'update' so the pre 'save' hooks
  // on the Note model are not triggered
  Note
  .update(
    { _id: reaction.note },
    { $pull: { reactions: reaction._id } }
  ).exec();

  // remove all notifications for the reaction
  Notification
  .find({ 'related.item': this._id })
  .then(notifications => notifications.forEach(n => n.remove()));

  next();
});

Reaction.pre('save', function(next) {

  if (!this.createdAt) {
    this.createdAt = new Date();
  } else {
    delete this.createdAt;
  }

  next();
});

module.exports = mongoose.model("reaction", Reaction);