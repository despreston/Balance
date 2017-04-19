const Notification = require('./base');

class NewReaction extends Notification {

  static remove (user, note, sender) {
    super.remove({
      userId: user,
      $and: [{ 'related.item': note }, { 'related.item': sender }]
    });
  }

  constructor (user, sender, note) {
    
    const related = [
      {
        kind: 'user',
        item: sender
      },
      {
        kind: 'note',
        item: note
      }
    ];

    super(user, 'new_reaction', related);
  }

}

module.exports = NewReaction;