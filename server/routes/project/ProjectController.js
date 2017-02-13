'use strict';
const Project = require('../../models/Project');
const Note = require('../../models/Note');

module.exports = (server) => {

  server.get(
    'projects/:_id', (req, res) => {
      Project
      .findOne(req.params)
      .lean()
      .then(project => res.send(200, project));
    });

  server.post(
    'projects', (req, res) => {
      let body = JSON.parse(req.body);

      if (!body.createdAt) {
        body.createdAt = new Date()
      }
      
      Project.create(body).then((newProject, err) => {
        if (err) {
          res.send(500);
        }
        return newProject;
      }).then(newProject => {
        let promises = [];

        // Create any notes that were added to the new project
        if (body.Past) {
          body.Past.project = newProject._id;
          promises.push(Note.create(body.Past));
        }

        if (body.Future) {
          body.Future.project = newProject._id;
          promises.push(Note.create(body.Future));
        }

        Promise.all(promises).then(notes => {
          notes.forEach(note => newProject[note.type] = note);
          res.send(201, newProject);
        });
      });
    });

  server.put(
    'projects/:_id', (req, res) => {
      req.body = JSON.parse(req.body);

      Project
      .findOne({_id: req.params._id})
      .then(project => {
        project = Object.assign(project, req.body);
        project.save();
        res.send(200, project);
      });
    });

  server.del(
    'projects/:_id', (req, res) => {
      Project
      .remove({ _id: req.params._id })
      .then(() => {
        res.send(200, []);
      });
    });

};