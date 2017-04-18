const Notification = require('./base');

class NewReaction extends Notification {

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