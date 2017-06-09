const Notification = require('./base');

class BookmarkedProjectUpdated extends Notification {

  static remove (user, project, owner) {
    super.remove({
      $and: [
        { 'related.item': project },
        { 'related.item': owner },
        { 'userId': user },
        { 'type': 'bookmarked_project_updated' }
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

    super(user, 'bookmarked_project_updated', related);
  }

  getPushNotificationText (notification) {
    const projectOwner = notification.related.find(r => r.kind === 'user').item;
    const project = notification.related.find(r => r.kind === 'project').item;

    return `${projectOwner.username} updated ${project.title}`;
  }

}

module.exports = BookmarkedProjectUpdated;