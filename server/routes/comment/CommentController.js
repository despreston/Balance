const Comment = require('../../models/Comment');
const Note = require('../../models/Note');
const log = require('logbro');

module.exports = ({ post }) => {

  post('comments', ({ body, user }, res) => {
    body = JSON.parse(body);

    Note
    .findOne({ _id: body.note })
    .then(note => {
      if (note.user !== user.sub) {
        res.send(403);
      }

      Comment
      .create(body)
      .then((comment, err) => {
        if (err) {
          log.error(err);
          return res.send(500);
        }

        note.comments.push(comment._id);
        note.save();

        Comment
        .findOne({ _id: comment._id })
        .populate('commenter', 'userId username picture')
        .lean()
        .then(comment => {
          delete comment.user;
          comment.commenter = comment.commenter[0];
          return res.send(201, comment)
        })
        .catch(err => {
          log.error(err);
          return res.send(500);
        });

      });
    })
    .catch(err => {
      log.error(err);
      return res.send(500);
    });

  });

};