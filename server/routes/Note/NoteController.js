'use strict';
const Note = require('../../models/Note');
const _ = require('lodash');

function createNote (req, res) {
  req.body = JSON.parse(req.body);

  if (!req.body.createdAt) {
    req.body.createdAt = new Date()
  }

  Note.create(req.body).then((newNote, err) => {
    if (err) {
      res.send(500);
    } else {
      res.send(200, newNote);
    }
  });
}

function findNote (req, res) {
  Note.findOne(req.params).then(note => res.send(200, note));
}

function findNotes (req, res) {
  Note.find(req.params).then(notes => res.send(200, notes));
}

function updateNote(req, res) {
  req.body = JSON.parse(req.body);

  Note.findOne({_id: req.params._id}).then(note => {
      note = _.extend(note, req.body);
      note.save();
      res.send(200, note);
  });
}

module.exports = (server, routeHelper) => {
  server.get('notes/:_id', findNote);
  server.get('notes', (req, res) => {
    routeHelper.requiredParams(req.params, res, ['project'])
  }, findNotes);

  server.post('notes', createNote);

  server.put('notes/:_id', updateNote);
};