const Comment = require('../../models/Comment');
const Note = require('../../models/Note');
const log = require('logbro');
const Notification = require('../../classes/notification/');
const { NewComment, NewCommentReply } = Notification;

module.exports = ({ post, del }) => {

  post('comments', async ({ body }, res) => {
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
        .populate('replyingToUser', 'userId username')
        .lean();

      // is the commenter also the author of the note?
      if (noteAuthor !== comment.commenter.userId) {
        // commenter is replying to another comment
        if (comment.replyingToUser) {
          new NewCommentReply(
            comment.replyingToUser.userId,
            comment.commenter._id,
            comment._id
          ).save();
        } else {
          new NewComment(noteAuthor, comment.commenter._id, comment._id).save();
        }
      } else if (comment.replyingToUser) {
        new NewCommentReply(
          comment.replyingToUser.userId,
          comment.commenter._id,
          comment._id
        ).save();
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

      return res.send(204);
    } catch (e) {
      log.error(e);
      return res.send(500);
    }
  });

};
