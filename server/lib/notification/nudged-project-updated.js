const Notification = require('./base');

class NudgedProjectUpdated extends Notification {

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

    super(user, 'nudged_project_updated', related);
  }

}

module.exports = NudgedProjectUpdated;