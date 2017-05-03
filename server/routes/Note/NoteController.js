const Note = require('../../models/Note');
const User = require('../../models/User');
const Project = require('../../models/Project');
const AccessControl = require('../../utils/access-control');
const Reaction = require('../../models/Reaction');
const log = require('logbro');
const Notification = require('../../lib/notification/');
const { NudgedProjectUpdated } = Notification;

module.exports = ({ get, post, put, del }) => {

  get('notes/:_id/reactions', ({ params, user }, res) => {
    Reaction
    .find({ note: params._id })
    .populate('user', 'userId username picture')
    .lean()
    .then(reactions => {
      reactions.forEach(r => delete r.userId);
      return res.send(200, reactions);
    })
    .catch(err => {
      log.error(err);
      return res.send(500);
    });
  });

  get('notes/global_activity', ({ params }, res) => {
    Note
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
        $match: { 'project.privacyLevel': { $ne: 'private' } }
      },
      {
        $sort: { 'createdAt': -1 }
      },
      {
        $limit: 10
      }
    ])
    .then(notes => {
      return Note
      .find(notes.map(n => n._id))
      .populate('project', 'title privacyLevel')
      .populate('reactions', 'userId reaction')
      .then(results => {
        return results.map(n => {
          n = n.toObject();
          delete n.comments;
          delete n.user;
          return n;
        });
      });
    })
    .then(notes => res.send(200, notes))
    .catch(err => {
      log.error(err);
      return res.send(500, err);
    });
  });

  get('notes/friend_activty', ({ params, user }, res) => {
    Note
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
        $match: { 'project.privacyLevel': { $ne: 'private' } }
      },
      {
        $sort: { 'createdAt': -1 }
      }
    ])
    .then(notes => {
      return Note
      .find(notes.map(n => n._id))
      .populate('project', 'title privacyLevel')
      .populate('reactions', 'userId reaction')
      .then(results => {
        return results.map(n => {
          n = n.toObject();
          delete n.comments;
          delete n.user;
          return n;
        });
      });
    })
    .then(notes => res.send(200, notes))
    .catch(err => {
      log.error(err);
      return res.send(500, err);
    });
  });

  get('notes/:_id', ({ params, user }, res) => {
    Note
    .findOne(params)
    .populate({
      path: 'comments',
      populate: { path: 'commenter', select: 'userId username picture' }
    })
    .populate('project', 'title privacyLevel')
    .populate('reactions', 'userId reaction')
    .then(note => {
      note = note.toObject();

      return AccessControl.single(note.user, user.sub, note.project.privacyLevel)
        .then(() => {

          // author is populated. no need for user
          if (note.comments) {
            note.comments.forEach(c => delete c.user);
          }

        })
        .then(() => res.send(200, note))
        .catch(err => {
          log.error(err);          
          return res.send(403, err);
        });
    })
    .catch(err => {
      log.error(err);
      return res.send(500, err);
    });
  });

  get('notes', ({ params, user }, res) => {
    AccessControl.many(params, user.sub)
    .then(privacyLevel => {

        Note
        .find(params)
        .sort({'createdAt': -1})
        .populate('project', 'title privacyLevel')
        .populate('reactions', 'userId reaction')
        .then(notes => {
          
          if (notes.length === 0) {
            return notes;
          }

          notes = notes.filter(note => {
            return privacyLevel.indexOf(note.project.privacyLevel) > -1;
          })

          return notes.map(n => {
            n = n.toObject();
            delete n.comments;
            delete n.user;
            return n;
          });
        })
        .then(notes => res.send(200, notes));
    })
    .catch(err => {
      log.error(err);
      return res.send(500);
    });
  });

  post('notes/:_id/reactions', ({ params, body, user }, res) => {
    body = JSON.parse(body);
    body.userId = user.sub;
    body.note = params._id;

    if (!body.reaction) {
      return res.send(400, 'Missing parameter: reaction');
    }

    Reaction
    .create(body)
    .then(reaction => {

      return Note
        .findByIdAndUpdate(
          { _id: body.note },
          { $push: { reactions: reaction._id } },
          { new: true }
        )
        .populate('project', 'title privacyLevel')
        .populate('author', 'userId username picture')
        .populate('reactions', 'userId reaction')
        .exec();
    })
    .then(note => {
      note = note.toObject();
      delete note.user;
      delete note.comments;
      note.reactions.forEach(r => delete r.user);
      return res.send(200, note);
    })
    .catch(err => {
      log.error(err);
      return res.send(500);
    });
  });

  post('notes', ({ body, user }, res) => {
    body = JSON.parse(body);

    if (body.user && body.user !== user.sub) {
      return res.send(403);
    }

    Note
    .create(body)
    .then(newNote => {

      return Note
        .findOne({ _id: newNote._id })
        .populate('project', 'title privacyLevel')
        .populate('author', 'userId username picture')
        .exec();
    })
    .then(newNote => {

      return Project
        .findOne({ _id: newNote.project })
        .select('title nudges')
        .then(project => {

          let { nudges } = project;

          User
          .findOne({ userId: project.user })
          .select('_id')
          .then(projectOwner => {
            nudges.forEach(user => {
              new NudgedProjectUpdated(user.userId, projectOwner, project._id).save();
            });
          })
          .catch(log.error);

          // reset nudges
          project.nudges = [];
          project.save();
          newNote.project = { _id: project._id, name: project.title };
          return newNote;
        })
        .catch(log.error);
    })
    .then(newNote => res.send(200, newNote))
    .catch(err => {
      log.error(err);
      return res.send(500);
    });
  });

  put('notes/:_id', ({ body, params, user }, res) => {
    body = JSON.parse(body);

    Note
    .findOne({_id: params._id})
    .populate('author', 'userId username picture')
    .populate('project', 'title privacyLevel')
    .populate('reactions', 'userId reaction')
    .populate({
      path: 'comments',
      populate: { path: 'commenter', select: 'userId username picture' }
    })
    .then(note => {

      if (note.user !== user.sub) {
        return res.send(403);
      }

      note = Object.assign(note, body);
      note.save();
      note = note.toObject();

      if (note.comments) {
        note.comments.forEach(c => {
          c.commenter = c.commenter[0];
          delete c.user;
        });

        note.commentCount = note.comments.length;
      }

      // I have NO idea why its some times an array and some times a single obj
      if (Array.isArray(note.author)) {
        note.author = note.author[0];
      }

      return res.send(200, note);
    })
    .catch(err => {
      log.error(err);
      return res.send(500);
    });
  });

   del('notes/:_id', ({ params, user }, res) => {
    Note
    .findOne(params)
    .then(note => {
      if (note.user !== user.sub) {
        return res.send(403);
      }

      note.remove();
    })
    .then(() => res.send(200, []))
    .catch(err => {
      log.error(err);
      return res.send(500);
    });
  })

};