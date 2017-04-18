const Notification = require('./base');

class NewComment extends Notification {

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

    super(user, 'new_comment', related);
  }

}

module.exports = NewComment;