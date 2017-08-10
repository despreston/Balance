const Note          = require('../../models/Note');
const User          = require('../../models/User');
const Project       = require('../../models/Project');
const AccessControl = require('../../utils/access-control');
const Reaction      = require('../../models/Reaction');
const Notification  = require('../../classes/notification/');
const s3remove      = require('../../utils/s3-remove');
const err           = require('restify-errors');
const compose       = require('../../utils/compose');

const { NewReaction } = Notification;
const excludedFromPartial = [ 'comments', 'user' ];
const toObject = arr => arr.map(item => item.toObject());

const removeFields = fields => arr => arr.map(item => {
  fields.forEach(field => delete item[field]);
  return item;
});

module.exports = ({ get, post, put, del }) => {

  get('notes/:_id/reactions', async ({ params }, res, next) => {
    try {
      const reactions = await Reaction
        .find({ note: params._id })
        .populate('user', 'userId username picture')
        .lean();

      const payload = reactions.map(reaction => delete reaction.userId);
      return res.send(200, payload);
    } catch (e) {
      return next(new err.InternalServerError(e));
    }
  });

  get('notes/global_activity', async ({ params, user }, res, next) => {
    try {
      const limit = parseInt(params.limit) || 30;
      const skip = parseInt(params.skip) || 0;
      const fns = [];

      let aggregation = [
        {
          $lookup: {
            from: 'projects',
            localField: 'project',
            foreignField: '_id',
            as: 'project'
          }
        },
        {
          $match: { 'project.privacyLevel': 'global' }
        },
        {
          $sort: { 'createdAt': -1 }
        },
        {
          $project: { _id: 1 }
        },
        {
          $skip: skip
        },
        {
          $limit: limit
        }
      ];

      if (user) {
        const loggedInUser = await User
          .findOne({ userId: user.sub })
          .select('userId friends');

        const users = loggedInUser.friends
          .filter(friend => friend.status === 'accepted')
          .map(friend => friend.userId)
          .concat(loggedInUser.userId);

        aggregation[1]['$match'] = {
          $or: [
            {
              'project.privacyLevel': { $ne: 'private' },
              'user': { $in: users }
            },
            {
              'project.privacyLevel': 'global'
            }
          ]
        };
      }

      const notes = await Note.aggregate(aggregation);

      const fullNotes = await Note
        .find({ _id: { $in: notes.map(n => n._id) } })
        .populate('project', 'title privacyLevel')
        .populate('reactions', 'userId reaction');

      fns.push(toObject);
      fns.push(removeFields(excludedFromPartial));

      const payload = compose(fns)(fullNotes);
      return res.send(200, payload);
    } catch (e) {
      return next(new err.InternalServerError(e));
    }
  });

  get('notes/friend_activity', async ({ params, user }, res, next) => {
    try {
      const limit = parseInt(params.limit) || 30;
      const skip = parseInt(params.skip) || 0;
      const fns = [];

      const loggedInUser = await User
        .findOne({ userId: user.sub })
        .select('userId friends');

      const users = loggedInUser.friends
        .filter(friend => friend.status === 'accepted')
        .map(friend => friend.userId)
        .concat(loggedInUser.userId);

      const notes = await Note
        .aggregate([
          {
            $lookup: {
              from: 'projects',
              localField: 'project',
              foreignField: '_id',
              as: 'project'
            }
          },
          {
            $match: {
              'project.privacyLevel': { $ne: 'private' },
              'user': { $in: users }
            }
          },
          {
            $sort: { 'createdAt': -1 }
          },
          {
            $project: { _id: 1 }
          },
          {
            $skip: skip
          },
          {
            $limit: limit
          }
        ]);

      const fullNotes = await Note
        .find({ _id: { $in: notes.map(n => n._id) } })
        .populate('project', 'title privacyLevel')
        .populate('reactions', 'userId reaction');

      fns.push(toObject);
      fns.push(removeFields(excludedFromPartial));

      const payload = compose(fns)(fullNotes);
      return res.send(200, payload);
    } catch (e) {
      return next(new err.InternalServerError(e));
    }
  });

  get('notes/:_id', async ({ params, user }, res, next) => {
    try {
      let note = await Note
        .findOne(params)
        .populate({
          path: 'comments',
          populate: {
            path: 'commenter replyingToUser',
            select: 'userId username picture'
          }
        })
        .populate('project', 'title privacyLevel')
        .populate('reactions', 'userId reaction');

      note = note.toObject();
      await AccessControl.single(note.user, user.sub, note.project.privacyLevel);

       // author is populated. no need for user
      if (note.comments) {
        note.comments.forEach(c => delete c.user);
      }

      return res.send(200, note);
    } catch (e) {
      return next(new err.InternalServerError(e));
    }
  });

  get('notes', async ({ params, user }, res, next) => {
    try {
      // To get private notes, you MUST include a `user` in the params
      // This is because AccessControl compares that param to `user.sub`
      const privacyLevels = await AccessControl.many(params, user.sub);
      const fns = [];

      const notes = await Note
        .find(params)
        .sort({'createdAt': -1})
        .populate('project', 'title privacyLevel')
        .populate('reactions', 'userId reaction');

      if (notes.length === 0) {
        return res.send(200, notes);
      }

      fns.push(notes => notes.filter(note => {
        return privacyLevels.includes(note.project.privacyLevel);
      }));

      fns.push(toObject);
      fns.push(removeFields(excludedFromPartial));

      const payload = compose(fns)(notes);
      return res.send(200, payload);
    } catch (e) {
      return next(new err.InternalServerError(e));
    }
  });

  post('notes/:_id/reactions', async ({ params, body, user }, res, next) => {
    try {
      body = JSON.parse(body);
      body.userId = user.sub;
      body.note = params._id;

      if (!body.reaction) {
        return next(new err.BadRequestError('Missing parameter: reaction'));
      }

      const reaction = await Reaction.create(body);

      let note = await Note
        .findByIdAndUpdate(
          { _id: body.note },
          { $push: { reactions: reaction._id } },
          { new: true }
        )
        .populate('project', 'title privacyLevel')
        .populate('author', 'userId username picture')
        .populate('reactions', 'userId reaction');

      /**
       * send notification to author of the note as long as the
       * person sending the notification is not the author of the note
       * i.e dont send notification to yourself!
       */
      if (note.author.userId !== user.sub) {
        User
        .findOne({ userId: user.sub })
        .select('_id')
        .then(user => {
          new NewReaction(note.author.userId, user._id, note._id, reaction._id).save();
        });
      }

      note = note.toObject();
      delete note.user;
      delete note.comments;
      note.reactions = removeFields(['user'])(note.reactions);

      return res.send(200, note);
    } catch (e) {
      return next(new err.InternalServerError(e));
    }
  });

  post('notes', async ({ body, user }, res, next) => {
    try {
      body = JSON.parse(body);
      body.user = user.sub;

      let note = await Note.create(body);

      note = await Note
        .findOne({ _id: note._id })
        .populate('project', 'title privacyLevel')
        .populate('author', 'userId username picture');

      await Project.clearNudges(note.project._id);

      return res.send(200, note);
    } catch (e) {
      return next(new err.InternalServerError(e));
    }
  });

  put('notes/:_id', async ({ body, params, user }, res, next) => {
    try {
      body = JSON.parse(body);

      // Don't let user change the project
      if (body.project) {
        delete body.project;
      }

      let note = await Note
        .findOne({_id: params._id})
        .populate('author', 'userId username picture')
        .populate('project', 'title privacyLevel')
        .populate('reactions', 'userId reaction')
        .populate({
          path: 'comments',
          populate: {
            path: 'commenter replyingToUser',
            select: 'userId username picture'
          }
        });

      if (note.user !== user.sub) {
        return next(new err.ForbiddenError());
      }

      // picture was replaced, so get rid of the old one
      if (body.picture && note.picture && body.picture !== note.picture) {
        await s3remove(note.picture);
      }

      // If note was marked complete, clear nudges on the project
      if (note.type === 'Future' && body.type && body.type === 'Past') {
        await Project.clearNudges(note.project._id);
      }

      note = Object.assign(note, body);
      note.save();
      note = note.toObject();

      if (note.comments) {
        // no need for user since we have commenter
        note.comments = removeFields(['user'])(note.comments);
        note.commentCount = note.comments.length;
      }

      // I have NO idea why its some times an array and some times a single obj
      if (Array.isArray(note.author)) {
        note.author = note.author[0];
      }

      return res.send(200, note);
    } catch(e) {
      return next(new err.InternalServerError(e));
    }
  });

  del('notes/:_id/picture', async ({ params, user }, res, next) => {
    try {
      let note = await Note
        .findOne({_id: params._id})
        .populate('author', 'userId username picture')
        .populate('project', 'title privacyLevel')
        .populate('reactions', 'userId reaction')
        .populate({
          path: 'comments',
          populate: {
            path: 'commenter replyingToUser',
            select: 'userId username picture'
          }
        });

      // trying to edit a note that does not belong to you
      if (note.user !== user.sub) {
        return next(new err.ForbiddenError());
      }

      // Note has no picture
      if (!note.picture) {
        return next(new err.NotFoundError());
      }

      await s3remove(note.picture);

      // Remove the picture from the database
      note.picture = undefined;
      note.save();
      note = note.toObject();

      if (note.comments) {
        // no need for user since we have commenter
        note.comments = removeFields(['user'])(note.comments);
        note.commentCount = note.comments.length;
      }

      // I have NO idea why its some times an array and some times a single obj
      if (Array.isArray(note.author)) {
        note.author = note.author[0];
      }

      return res.send(204, note);
    } catch(e) {
      return next(new err.InternalServerError(e));
    }
  });

  del('notes/:_id', async ({ params, user }, res, next) => {
    try {
      let note = await Note.findOne(params);

      if (note.user !== user.sub) {
        return next(new err.ForbiddenError());
      }

      note.remove();

      if (note.picture) {
        await s3remove(note.picture);
      }

      return res.send(204);
    } catch (e) {
      return next(new err.InternalServerError(e));
    }
  });

};
