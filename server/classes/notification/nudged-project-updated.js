const Notification = require('./base');

class NudgedProjectUpdated extends Notification {

  static remove (user, project, owner) {
    super.remove({
      $and: [
        { 'related.item': project },
        { 'related.item': owner },
        { 'userId': user },
        { 'type': 'nudged_project_updated' }
      ]
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

  getPushNotificationText (notification) {
    const projectOwner = notification.related.find(r => r.kind === 'user').item;
    const project = notification.related.find(r => r.kind === 'project').item;

    return `${projectOwner.username} listened to your nudge! ${project.title} was recently updated.`;
  }

}

module.exports = NudgedProjectUpdated;