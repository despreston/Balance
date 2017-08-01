const Notification = require('../../models/Notification');
const log = require('logbro');

module.exports = ({ get, post }) => {

  get('notifications', async ({ user }, res) => {
    try {
      const notifications = await Notification
        .find({ userId: user.sub })
        .populate('related.item');

      return res.send(200, notifications);
    } catch (e) {
      log.error(e);
      return res.send(500);
    }
  });

  post('notifications/read', async ({ user }, res) => {
    try {
      /**
       * Returns an empty array because mongo `update` returns a WriteResult--
       * not the updated documents.
       */
      await Notification
        .update(
          { $and: [{ readAt: { $exists: false } }, { userId: user.sub }] },
          { $set: { readAt: new Date() } },
          { multi: true }
        );

      return res.send(200, []);
    } catch (e) {
      log.error(e);
      return res.send(500);
    }
  });

  post('notifications/clear', async ({ user }, res) => {
    try {
      let notifications = await Notification.find({ userId: user.sub });

      notifications.forEach(n => n.remove());

      return res.send(200, []);
    } catch (e) {
      log.error(e);
      return res.send(500);
    }
  });

};