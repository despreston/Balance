const Note = require('../../models/Note');
const Project = require('../../models/Project');
const AccessControl = require('../../utils/access-control');

module.exports = ({ get, post, put }) => {

  get('notes/:_id', ({ params, user }, res) => {
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

  get('notes', ({ params, user }, res) => {
    /**
     * Note access control is a bit difference since the privacyLevel needs to
     * come from the project associated with the note.
     * Get the list of notes requested, look at the first note received to get
     * project info, and use that with the AccessControl stuff.
     */
    Note
    .find(params)
    .sort({'createdAt': -1})
    .populate('project', 'title privacyLevel')
    .lean()
    .then(notes => {
      if (!notes) {
        return res.send(200, notes);
      }
      
      const owner = notes[0].user;
      const { privacyLevel } = notes[0].project;

      return AccessControl.single(owner, user.sub, privacyLevel)
        .then(() => res.send(200, notes))
        .catch(err => res.send(403, err));
    })
    .catch(err => res.send(500, err));
  });

  post('notes', ({ body, user }, res) => {
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
        .then(project => {
          // reset nudges
          project.nudges = [];
          project.save();
          
          newNote.project = { _id: project._id, name: project.title };
          return newNote;
        });

    })
    .then(newNote => res.send(200, newNote));
  });

  put('notes/:_id', ({ body, params, user }, res) => {
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