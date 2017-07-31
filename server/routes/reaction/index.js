const Reaction        = require('../../models/Reaction');
const User            = require('../../models/User');
const log             = require('logbro');
const Notification    = require('../../classes/notification/');
const { NewReaction } = Notification;

module.exports = ({ del }) => {

  del('reactions/:_id', async ({ params, user }, res) => {
    try {
      const reaction = await Reaction.findOne(params);

      if (reaction.userId !== user.sub) return res.send(403);

      await reaction.remove();

      const reactionUser = await User
        .findOne({ userId: user.sub })
        .select('_id');

      await NewReaction.remove(reaction.userId, reaction.note, reactionUser._id);

      return res.send(200, []);
    } catch (e) {
      log.error(e);
      return res.send(500);
    }
  })

};