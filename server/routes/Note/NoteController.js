const Note = require('../../models/Note');
const Project = require('../../models/Project');
const AccessControl = require('../../utils/access-control');

module.exports = server => {

  server.get(
    'notes/:_id', ({ params, user }, res) => {
      Note
      .findOne(params)
      .populate('project', 'title privacyLevel')
      .lean()
      .then(note => {
        return AccessControl.single(note.user, user.sub, note.project.privacyLevel)
          .then(() => res.send(200, note))
          .catch(err => res.send(403, err));
      })
      .catch(err => res.send(500, err));
    });

  server.get(
    'notes', ({ params, user }, res) => {

      AccessControl.many(params, user.sub)
        .then(privacyLevel => {

          Note
          .find(params)
          .sort({'createdAt': -1})
          .populate('project', 'title privacyLevel')
          .lean()
          .then(notes => {
            notes = notes.filter(note => {
              return privacyLevel.indexOf(note.project.privacyLevel) > -1;
            });
            res.send(200, notes);
          })
          .catch(err => res.send(500, err));

        })
        .catch(err => res.send(403, err));
    });

  server.post(
    'notes', ({ body, user }, res) => {
      body = JSON.parse(body);

      if (body.user && body.user !== user.sub) {
        return res.send(403);
      }

      Note
      .create(body)
      .then((newNote, err) => {
        if (err) {
          res.send(500, err);
        }

        return Project
          .findOne({ _id: newNote.project })
          .select('title')
          .lean()
          .then(project => {
            newNote.project = { _id: project._id, name: project.title };
            return newNote;
          });

      })
      .then(newNote => res.send(200, newNote));
    });

  server.put(
    'notes/:_id', ({ body, params, user }, res) => {
      body = JSON.parse(body);

      Note
      .findOne({_id: params._id})
      .then(note => {
        if (note.user !== user.sub) {
          return res.send(403);
        }

        note = Object.assign(note, body);
        note.save();

        // Add properly formatted project object back to the note
        note = Object.assign(note.toObject(), { project: body.project });

        res.send(200, note);
      })
      .catch(err => res.send(500, err));
    });

};