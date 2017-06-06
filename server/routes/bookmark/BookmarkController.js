const Bookmark = require('../../models/Bookmark');
const log = require('logbro');

module.exports = ({ post, del }) => {

  post('bookmarks', async ({ body, user }, res) => {
    try {
      body = JSON.parse(body);

      if (!body.project) return res.send(403);

      let bookmark = await Bookmark.create({
        project: body.project,
        userId: user.sub
      });

      bookmark = await Bookmark.findOne({ _id: bookmark._id })
        .populate('bookmarker', 'userId username picture');

      bookmark = bookmark.toObject({ virtuals: true });

      return res.send(201, bookmark);
    } catch (e) {
      log.error(e);
      return res.send(500);
    }
  });

  del('bookmarks/:_id', async ({ params, user }, res) => {
    try {
      const bookmark = await Bookmark.findOne(params);

      if (bookmark.userId !== user.sub) return res.send(403);

      bookmark.remove();

      return res.send(200, []);
    } catch (e) {
      log.error(e);
      return res.send(500);
    }
  });

};