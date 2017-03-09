const Note = require('../../models/Note');
const Project = require('../../models/Project');

module.exports = server => {

  server.get(
    'notes/:_id', ({ params }, res) => {
      Note
      .findOne(params)
      .lean()
      .then(note => res.send(200, note));
    });

  server.get(
    'notes', ({ params }, res) => {
      Note
      .find(params).sort({'createdAt': -1}).lean()
      .then(notes => {
        /**
         * Get the project name for each note
         * Transform the project property of the note into the structure:
         * { _id: <project _id>, name: <project name> }
         */
        return Project
          .find({ _id: { $in: notes.map(note => note.project) } })
          .select('title')
          .lean()
          .then(projects => Note.augmentWithProjectInfo(projects, notes));
      })
      .then(notes => res.send(200, notes))
      .catch(err => res.send(500, err));
    });

  server.post(
    'notes', ({ body }, res) => {
      body = JSON.parse(body);

      if (!body.createdAt) {
        body.createdAt = new Date()
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

      }).then(newNote => {
        res.send(200, newNote);
      });
    });

  server.put(
    'notes/:_id', ({ body, params }, res) => {
      body = JSON.parse(body);

      Note
      .findOne({_id: params._id})
      .then(note => {
        note = Object.assign(note, body);
        note.save();

        // Add properly formatted project object back to the note
        note = Object.assign(note.toObject(), { project: body.project });

        res.send(200, note);
      })
      .catch(err => res.send(500, err));
    });

};