const Note = require('../../models/Note');
const Project = require('../../models/Project');

module.exports = server => {

  server.get(
    'notes/:_id', (req, res) => {
      Note
      .findOne(req.params)
      .lean()
      .then(note => res.send(200, note));
    });

  server.get(
    'notes', (req, res) => {
      Note
      .find(req.params).sort({'lastUpdated': -1}).lean()
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
    'notes', (req, res) => {
      req.body = JSON.parse(req.body);

      if (!req.body.createdAt) {
        req.body.createdAt = new Date()
      }

      Note
      .create(req.body)
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
    'notes/:_id', (req, res) => {
      req.body = JSON.parse(req.body);

      Note
      .findOne({_id: req.params._id})
      .then(note => {
        note = Object.assign(note, req.body);
        note.save();

        // Add properly formatted project object back to the note
        note = Object.assign(note.toObject(), { project: req.body.project });
        res.send(200, note);
      })
      .catch(err => res.send(500, err));
    });

};