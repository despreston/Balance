'use strict';
const Project = require('../../models/Project');
const Note = require('../../models/Note');
const _ = require('lodash');

function createProject (req, res) {
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
      res.send(200, newProject);
    });
  });
}

function findProject (req, res) {
  Project.findOne(req.params).lean().then(project => res.send(200, project));
}

function updateProject (req, res) {
  req.body = JSON.parse(req.body);
  
  Project.findOne({_id: req.params._id}).then(project => {
    project = _.extend(project, req.body);
    project.save();
    res.send(200, project);
  });
}

module.exports = (server) => {
  server.get('projects/:_id', findProject);

  server.post('projects', createProject);

  server.put('projects/:_id', updateProject);
};