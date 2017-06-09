const Notification = require('./base');

class NewComment extends Notification {

  static remove (user, note, commenter) {
    super.remove({
      $and: [
        { 'related.item': note },
        { 'related.item': commenter },
        { 'userId': user },
        { 'type': 'new_comment' }
      ]
    });
  }

  constructor (user, commenter, note) {
    const related = [
      {
        kind: 'user',
        item: commenter
      },
      {
        kind: 'note',
        item: note
      }
    ];

    super(user, 'new_comment', related);
  }

  getPushNotificationText (notification) {
    const sender = notification.related.find(item => item.kind === 'user').item;

    return `${sender.username} commented on your note.`;
  }

}

module.exports = NewComment;