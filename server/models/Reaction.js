const mongoose = require('mongoose');
const Note = require('./Note');

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

}, {
  toObject: { virtuals: true }
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

  // Remove the reaction from the Note
  Note
  .findOne({ _id: reaction.note })
  .then(note => {
    const idx = note.reactions.findIndex(r => r._id === reaction._id);
    note.reactions.splice(idx);
    note.save();
    next();
  });

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