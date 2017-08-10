const Reaction        = require('../../models/Reaction');
const User            = require('../../models/User');
const Notification    = require('../../classes/notification/');
const err             = require('restify-errors');
const { NewReaction } = Notification;

module.exports = ({ del }) => {

  del('reactions/:_id', async ({ params, user }, res, next) => {
    try {
      const reaction = await Reaction.findOne(params);

      if (reaction.userId !== user.sub) {
        return next(new err.ForbiddenError());
      }

      await reaction.remove();

      const reactionUser = await User
        .findOne({ userId: user.sub })
        .select('_id');

      await NewReaction.remove(reaction.userId, reaction.note, reactionUser._id);

      return res.send(200, []);
    } catch (e) {
      return next(new err.InternalServerError(e));
    }
  })

};
