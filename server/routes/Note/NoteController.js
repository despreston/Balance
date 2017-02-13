const Note = require('../../models/Note');
const _ = require('lodash');

module.exports = server => {

  server.get(
    'notes/:_id', (res, req) => {
      Note
      .findOne(req.params)
      .lean()
      .then(note => res.send(200, note));
    });

  server.get(
    'notes', (req, res) => {
      Note
      .find(req.params)
      .sort({'lastUpdated': -1})
      .lean()
      .then(notes => {
        res.send(200, notes)
      });
    });

  server.post(
    'notes', (res, req) => {
      req.body = JSON.parse(req.body);

      if (!req.body.createdAt) {
        req.body.createdAt = new Date()
      }

      Note
      .create(req.body)
      .then((newNote, err) => {
        if (err) {
          res.send(500);
        } else {
          res.send(200, newNote);
        }
      });
    });

  server.put(
    'notes/:_id', (res, req) => {
      req.body = JSON.parse(req.body);

      Note
      .findOne({_id: req.params._id})
      .then(note => {
        note = Object.assign({}, note, req.body);
        note.save();
        res.send(200, note);
      });
    });

};