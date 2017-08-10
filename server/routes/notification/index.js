const Notification = require('../../models/Notification');
const err          = require('restify-errors');

module.exports = ({ get, post }) => {

  get('notifications', async ({ user }, res, next) => {
    try {
      const notifications = await Notification
        .find({ userId: user.sub })
        .populate('related.item');

      return res.send(200, notifications);
    } catch (e) {
      return next(new err.InternalServerError(e));
    }
  });

  post('notifications/read', async ({ user }, res, next) => {
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
      return next(new err.InternalServerError(e));
    }
  });

  post('notifications/clear', async ({ user }, res, next) => {
    try {
      const notifications = await Notification.find({ userId: user.sub });

      notifications.forEach(n => n.remove());

      return res.send(200, []);
    } catch (e) {
      return next(new err.InternalServerError(e));
    }
  });

};
