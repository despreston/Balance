const Notification = require('./base');

class NewNudge extends Notification {

  constructor (user, sender, project) {
    
    const related = [
      { 
        kind: 'user',
        item: sender
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