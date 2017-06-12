const Notification = require('./base');

class AcceptedFriendRequest extends Notification {

  static remove (user, sender) {
    super.remove({
      $and: [
        { 'related.item': sender },
        { 'userId': user },
        { 'type': 'accepted_friend_request' }
      ]
    });
  }

  constructor (user, sender) {
    const related = [{
      kind: 'user',
      item: sender
    }];

    super(user, 'accepted_friend_request', related);
  }

  getPushNotificationText (notification) {
    const friend = notification.related.find(r => r.kind === 'user').item;

    return `${friend.username} accepted your friend request.`;
  }

}

module.exports = AcceptedFriendRequest;