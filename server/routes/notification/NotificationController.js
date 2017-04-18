const Notification = require('../../models/Notification');
const log = require('logbro');

module.exports = ({ get }) => {

  get('notifications', ({ user }, res) => {
    Notification
    .find({ userId: user.sub })
    .populate('fullSender', 'userId username picture')
    .populate('related.item')
    .then(notifications => res.send(200, notifications.toObject()))
    .catch(err => {
      log.error(err);
      return res.send(500);
    });
  });

};