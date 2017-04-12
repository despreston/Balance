const Reaction = require('../../models/Reaction');
const log = require('logbro');

module.exports = ({ del }) => {

  del('reactions/:_id', ({ params, user }, res) => {
    Reaction
    .findOne(params)
    .then(reaction => {
      if (reaction.userId !== user.sub) {
        return res.send(403);
      }

      reaction.remove();
    })
    .then(() => res.send(200, []))
    .catch(err => {
      log.error(err);
      return res.send(500);
    });
  })

};