const Notification = require('./base');

class AcceptedFriendRequest extends Notification {

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