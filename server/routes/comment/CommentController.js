const Comment = require('../../models/Comment');
const Note = require('../../models/Note');
const log = require('logbro');
const Notification = require('../../lib/notification/');
const { NewComment } = Notification;

module.exports = ({ post, del }) => {

  post('comments', ({ body, user }, res) => {
    body = JSON.parse(body);

    Comment
    .create(body)
    .then((comment, err) => {

      if (err) {
        log.error(err);
        return res.send(500);
      }

      Note
      .findOne({ _id: body.note })
      .then(note => {
        note.comments.push(comment._id);
        note.save();
        return note.user;
      })
      .then(noteAuthor => {
        return Comment
        .findOne({ _id: comment._id })
        .populate('commenter', 'userId username picture')
        .lean()
        .then(comment => {
          
          // Create notification for author if the comment is by someone other
          // than the author.
          if (noteAuthor !== comment.commenter._id) {
            new NewComment(noteAuthor, comment.commenter._id, comment.note).save();
          }

          delete comment.user;
          return res.send(201, comment)
        });
      });
    })
    .catch(err => {
      log.error(err);
      return res.send(500);
    });

  });

  del('comments/:_id', ({ params, user }, res) => {

    Comment
    .findOne(params)
    .then(comment => {
      if (comment.user !== user.sub) {
        return res.send(403);
      }

      comment.remove();
    })
    .then(() => res.send(200, []))
    .catch(err => {
      log.error(err);
      return res.send(500);
    });
  })

};