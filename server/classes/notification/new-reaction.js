const Notification = require('./base');

class NewReaction extends Notification {

  static remove (user, note, sender) {
    super.remove({
      $and: [
        { userId: user },
        { 'related.item': note },
        { 'related.item': sender },
        { type: 'new_reaction' }
      ]
    });
  }

  constructor (user, sender, note, reaction) {
    const related = [
      {
        kind: 'user',
        item: sender
      },
      {
        kind: 'note',
        item: note
      },
      {
        kind: 'reaction',
        item: reaction
      }
    ];

    super(user, 'new_reaction', related);
  }

  getPushNotificationText (notification) {
    const sender = notification.related.find(item => item.kind === 'user').item;
    const reaction = notification.related.find(item => item.kind === 'reaction').item;

    return `${sender.username} reacted to your note. ${reaction.reaction}`;
  }

}

module.exports = NewReaction;