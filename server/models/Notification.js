const mongoose = require('mongoose');

let Notification = new mongoose.Schema ({

  type: {
    type: String,
    required: true,
    enum: [
      'new_friend_request',
      'accepted_friend_request',
      'new_nudge',
      'nudged_project_updated',
      'new_reaction',
      'new_comment',
      'bookmarked_project_updated'
    ]
  },

  // any model instances related to this notification
  related: [{
    kind: {
      type: String,
      required: true,
      enum: [ 'project', 'user', 'note', 'reaction', 'comment' ]
    },
    item: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'related.kind',
      required: true
    }
  }],

  // The user that should receive the notification
  userId: {
    type: String,
    required: true,
    index: true
  },

  readAt: Date,

  createdAt: {
    type: Date,
    required: true
  }

});

/**
 * Ref to sender
 */
Notification.virtual('fullSender', {
  ref: 'user',
  localField: 'sender',
  foreignField: 'userId',
  justOne: true
});

module.exports = mongoose.model("notification", Notification);
