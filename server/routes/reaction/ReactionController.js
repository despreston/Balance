const Reaction        = require('../../models/Reaction');
const User            = require('../../models/User');
const log             = require('logbro');
const Notification    = require('../../classes/notification/');
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
        return User
        .findOne({ userId: user.sub })
        .select('_id')
        .then(user => {
          return NewReaction.remove(reaction.userId, reaction.note, user._id);
        });
      });
    })
    .then(() => res.send(200, []))
    .catch(err => {
      log.error(err);
      return res.send(500);
    });
  })

};