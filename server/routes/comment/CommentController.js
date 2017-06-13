const Comment = require('../../models/Comment');
const Note = require('../../models/Note');
const log = require('logbro');
const Notification = require('../../classes/notification/');
const { NewComment } = Notification;

module.exports = ({ post, del }) => {

  post('comments', async ({ body, user }, res) => {
    try {
      body = JSON.parse(body);
      let comment = await Comment.create(body);

      let note = await Note
        .findByIdAndUpdate(
          { _id: body.note },
          { $push: { comments: comment._id } },
          { new: true }
        );

      let noteAuthor = note.user;

      comment = await Comment
        .findOne({ _id: comment._id })
        .populate('commenter', 'userId username picture')
        .lean();

      // Create notification for author if the comment is by someone other
      // than the author.
      if (noteAuthor !== comment.commenter.userId) {
        new NewComment(noteAuthor, comment.commenter._id, comment._id).save();
      }

      delete comment.user;

      return res.send(201, comment);
    } catch (e) {
      log.error(e);
      return res.send(500);
    }
  });

  del('comments/:_id', async ({ params, user }, res) => {
    try {
      const comment = await Comment.findOne(params);

      if (comment.user !== user.sub) {
        return res.send(403);
      }

      comment.remove();

      return res.send(200, []);
    } catch (e) {
      log.error(e);
      return res.send(500);
    }
  });

};