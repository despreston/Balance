const Notification = require('../../models/Notification');
const log = require('logbro');

module.exports = ({ get, post }) => {

  get('notifications', ({ user }, res) => {
    Notification
    .find({ userId: user.sub })
    .populate('related.item')
    .then(notifications => res.send(200, notifications))
    .catch(err => {
      log.error(err);
      return res.send(500);
    });
  });

  post('notifications/read', ({ user }, res) => {

    /**
     * Returns an empty array because mongo `update` returns a WriteResult--
     * not the updated documents.
     */
    Notification
    .update(
      {
        $and: [{ readAt: { $exists: false } }, { userId: user.sub }]
      },
      { $set: { readAt: new Date() } },
      { multi: true }
    ).then(() => res.send(200, []))
    .catch(err => {
      log.error(err);
      return res.send(500);
    });
  })

};