const Notification = require('./base');

class NewNudge extends Notification {

  static remove (user, project, nudger) {
    super.remove({
      userId: user,
      $and: [{ 'related.item': nudger }, { 'related.item': project }]
    });
  }

  constructor (user, nudger, project) {
    
    const related = [
      {
        kind: 'user',
        item: nudger
      },
      {
        kind: 'project',
        item: project
      }
    ];

    super(user, 'new_nudge', related);
  }

}

module.exports = NewNudge;