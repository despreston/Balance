const Note = require('../../models/Note');
const User = require('../../models/User');
const Project = require('../../models/Project');
const AccessControl = require('../../utils/access-control');
const Reaction = require('../../models/Reaction');
const log = require('logbro');
const Notification = require('../../classes/notification/');
const s3remove = require('../../utils/s3-remove');

const { NewReaction } = Notification;

module.exports = ({ get, post, put, del }) => {

  get('notes/:_id/reactions', async ({ params, user }, res) => {
    try {
      let reactions = await Reaction
        .find({ note: params._id })
        .populate('user', 'userId username picture')
        .lean();

      reactions.forEach(r => delete r.userId);

      return res.send(200, reactions);
    } catch (e) {
      log.error(e);
      return res.send(500);
    }
  });

  get('notes/global_activity', async ({ params, user }, res) => {
    try {
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
          $limit: 20
        }
      ];

      if (user) {
        let loggedInUser = await User
          .findOne({ userId: user.sub })
          .select('userId friends');

        const friends = loggedInUser.friends.filter(f => f.status === 'accepted');
        const friendsAndMe = friends.map(f => f.userId).concat(loggedInUser.userId);

        aggregation[1]['$match'] = {
          $or: [
            {
              'project.privacyLevel': { $ne: 'private' },
              'user': { $in: friendsAndMe }
            },
            {
              'project.privacyLevel': 'global'
            }
          ]
        };
      }

      const notes = await Note.aggregate(aggregation);

      let fullNotes = await Note
        .find({ _id: { $in: notes.map(n => n._id) } })
        .populate('project', 'title privacyLevel')
        .populate('reactions', 'userId reaction');

      fullNotes = fullNotes.map(n => {
        n = n.toObject();
        delete n.comments;
        delete n.user;
        return n;
      });

      return res.send(200, fullNotes);
    } catch (e) {
      log.error(e);
      return res.send(500);
    }
  });

  get('notes/friend_activity', async ({ params, user }, res) => {
    try {
      let loggedInUser = await User
        .findOne({ userId: user.sub })
        .select('userId friends');

      const friends = loggedInUser.friends.filter(f => f.status === 'accepted');
      const friendsAndMe = friends.map(f => f.userId).concat(loggedInUser.userId);

      let notes = await Note
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
              'user': { $in: friendsAndMe }
            }
          },
          {
            $sort: { 'createdAt': -1 }
          },
          {
            $project: { _id: 1 }
          },
          {
            $limit: 20
          }
        ]);

      notes = await Note
        .find({ _id: { $in: notes.map(n => n._id) } })
        .populate('project', 'title privacyLevel')
        .populate('reactions', 'userId reaction');

      notes.map(n => {
        n = n.toObject();
        delete n.comments;
        delete n.user;
        return n;
      });

      return res.send(200, notes);
    } catch (e) {
      log.error(e);
      return res.send(500);
    }
  });

  get('notes/:_id', async ({ params, user }, res) => {
    try {
      let note = await Note
        .findOne(params)
        .populate({
          path: 'comments',
          populate: { path: 'commenter', select: 'userId username picture' }
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
      log.error(e);
      return res.send(500);
    }
  });

  get('notes', async ({ params, user }, res) => {
    try {
      // To get private notes, you MUST include a `user` in the params
      // This is because AccessControl compares that param to `user.sub`
      const privacyLevels = await AccessControl.many(params, user.sub);

      let notes = await Note
        .find(params)
        .sort({'createdAt': -1})
        .populate('project', 'title privacyLevel')
        .populate('reactions', 'userId reaction');

      if (notes.length === 0) return res.send(200, notes);

      notes = notes.filter(note => {
        return privacyLevels.indexOf(note.project.privacyLevel) > -1;
      });

      notes = notes.map(n => {
        n = n.toObject();
        delete n.comments;
        delete n.user;
        return n;
      });

      return res.send(200, notes);
    } catch (e) {
      log.error(e);
      return res.send(500);
    }
  });

  post('notes/:_id/reactions', async ({ params, body, user }, res) => {
    try {
      body = JSON.parse(body);
      body.userId = user.sub;
      body.note = params._id;

      if (!body.reaction) return res.send(400, 'Missing parameter: reaction');  

      let reaction = await Reaction.create(body);

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
      note.reactions.forEach(r => delete r.user);

      return res.send(200, note);
    } catch (e) {
      log.error(e);
      return res.send(500);
    }
  });

  post('notes', async ({ body, user }, res) => {
    try {
      body = JSON.parse(body);

      if (body.user && body.user !== user.sub) return res.send(403);

      let note = await Note.create(body);

      note = await Note
        .findOne({ _id: note._id })
        .populate('project', 'title privacyLevel')
        .populate('author', 'userId username picture');

      await Project.clearNudges(note.project._id);

      return res.send(200, note);
    } catch (e) {
      log.error(e);
      return res.send(500);
    }
  });

  put('notes/:_id', async ({ body, params, user }, res) => {
    try {
      body = JSON.parse(body);

      let note = await Note
        .findOne({_id: params._id})
        .populate('author', 'userId username picture')
        .populate('project', 'title privacyLevel')
        .populate('reactions', 'userId reaction')
        .populate({
          path: 'comments',
          populate: { path: 'commenter', select: 'userId username picture' }
        });

      if (note.user !== user.sub) return res.send(403);

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
        note.comments.forEach(c => delete c.user);
        note.commentCount = note.comments.length;
      }

      // I have NO idea why its some times an array and some times a single obj
      if (Array.isArray(note.author)) {
        note.author = note.author[0];
      }

      return res.send(200, note);
    } catch(e) {
      log.error(e);
      return res.send(500);
    }
  });

  del('notes/:_id/picture', async ({ params, user }, res) => {
    try {
      let note = await Note
        .findOne({_id: params._id})
        .populate('author', 'userId username picture')
        .populate('project', 'title privacyLevel')
        .populate('reactions', 'userId reaction')
        .populate({
          path: 'comments',
          populate: { path: 'commenter', select: 'userId username picture' }
        });

      // trying to edit a note that does not belong to you
      if (note.user !== user.sub) return res.send(403);

      // Note has no picture
      if (!note.picture) return res.send(404);

      await s3remove(note.picture);
    
      // Remove the picture from the database
      note.picture = undefined;

      note.save();
      note = note.toObject();

      if (note.comments) {
        // no need for user since we have commenter
        note.comments.forEach(c => delete c.user);
        note.commentCount = note.comments.length;
      }

      // I have NO idea why its some times an array and some times a single obj
      if (Array.isArray(note.author)) {
        note.author = note.author[0];
      }
      
      return res.send(200, note);
    } catch(e) {
      log.error(e);
      return res.send(500);
    }
  });

  del('notes/:_id', async ({ params, user }, res) => {
    try {
      let note = await Note.findOne(params);
      
      if (note.user !== user.sub) return res.send(403);

      note.remove();
      
      return res.send(200, []);
    } catch (e) {
      log.error(e);
      return res.send(500);
    }
  });

};