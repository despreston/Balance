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

  getPushNotificationText (notification) {
    const sender = notification.related.find(item => item.kind === 'user').item;
    const project = notification.related.find(item => item.kind === 'project').item;

    return `${sender.username} wants you to work on ${project.title}.`;
  }

}

module.exports = NewNudge;