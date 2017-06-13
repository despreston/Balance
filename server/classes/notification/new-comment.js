const Notification = require('./base');

class NewComment extends Notification {

  static remove (user, comment, commenter) {
    super.remove({
      $and: [
        { 'related.item': comment },
        { 'related.item': commenter },
        { 'userId': user },
        { 'type': 'new_comment' }
      ]
    });
  }

  constructor (user, commenter, comment) {
    const related = [
      {
        kind: 'user',
        item: commenter
      },
      {
        kind: 'comment',
        item: comment
      }
    ];

    super(user, 'new_comment', related);
  }

  getPushNotificationText (notification) {
    const sender = notification.related.find(item => item.kind === 'user').item;
    const comment = notification.related.find(item => item.kind === 'comment').item;
    let short = comment.content.slice(0, 60);

    if (comment.content.length > 60) {
      short += '...';
    }

    return `${sender.username} commented on your note: "${short}"`;
  }

}

module.exports = NewComment;