const Notification = require('./base');

class NudgedProjectUpdated extends Notification {

  static remove (user, project, owner) {
    super.remove({
      userId: user,
      $and: [{ 'related.item': project }, { 'related.item': owner }]
    });
  }

  constructor (user, owner, project) {
    
    const related = [
      {
        kind: 'user',
        item: owner
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