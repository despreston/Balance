const Notification = require('./base');

class NewReaction extends Notification {

  static remove (user, note, sender) {
    super.remove({
      userId: user,
      $and: [{ 'related.item': note }, { 'related.item': sender }]
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

}

module.exports = NewReaction;