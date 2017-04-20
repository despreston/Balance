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
    Notification
    .update(
      {
        $and: [{ readAt: { $exists: false } }, { userId: user.sub }]
      },
      { $set: { readAt: new Date() } }
    ).then(notifications => res.send(200, notifications))
    .catch(err => {
      log.error(err);
      return res.send(500);
    });
  })

};