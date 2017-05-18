const Notification = require('./base');

class AcceptedFriendRequest extends Notification {

  constructor (user, sender) {
    
    const related = [{
      kind: 'user',
      item: sender
    }];

    super(user, 'accepted_friend_request', related);
  }

}

module.exports = AcceptedFriendRequest;