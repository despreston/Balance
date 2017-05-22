const Reaction = require('../../models/Reaction');
const log = require('logbro');
const Notification = require('../classes/notification/');
const { NewReaction } = Notification;

module.exports = ({ del }) => {

  del('reactions/:_id', ({ params, user }, res) => {
    Reaction
    .findOne(params)
    .then(reaction => {
      if (reaction.userId !== user.sub) {
        return res.send(403);
      }

      return reaction.remove().then(() => {
        return NewReaction.remove(reaction.userId, reaction.note, user.sub);
      });
    })
    .then(() => res.send(200, []))
    .catch(err => {
      log.error(err);
      return res.send(500);
    });
  })

};