const Notification = require('./base');

class NewComment extends Notification {

  static remove (user, note, commenter) {
    super.remove({
      userId: user,
      $and: [{ 'related.item': note }, { 'related.item': commenter }]
    });
  }

  constructor (user, commenter, note) {
    
    const related = [
      {
        kind: 'user',
        item: commenter
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