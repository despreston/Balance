const Notification = require('./base');

class NewFriendRequest extends Notification {

  static remove (user, sender) {
    super.remove({ userId: user, 'related.item': sender });
  }

  constructor (user, sender) {
    
    const related = [{
      kind: 'user',
      item: sender
    }];

    super(user, 'new_friend_request', related);
  }

}

module.exports = NewFriendRequest;