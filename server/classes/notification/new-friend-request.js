const Notification = require('./base');

class NewFriendRequest extends Notification {

  static remove (user, sender) {
    super.remove({
      $and: [
        { 'related.item': sender },
        { 'userId': user },
        { 'type': 'new_friend_request' }
      ]
    });
  }

  constructor (user, sender) {
    const related = [{
      kind: 'user',
      item: sender
    }];

    super(user, 'new_friend_request', related);
  }

  getPushNotificationText (notification) {
    const sender = notification.related.find(r => r.kind === 'user').item;
    return `${sender.username} wants to be your friend.`;
  }

}

module.exports = NewFriendRequest;