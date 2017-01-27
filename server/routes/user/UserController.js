'use strict';
const User = require('../../models/User');
const Project = require('../../models/Project');
const ObjectId = require('mongoose').Types.ObjectId;

function createUser (req, res) {
  User.create(req.params).then((err, newUser) => {
    if (err) {
      res.send(500);  
    } else {
      res.send(204, newUser);
    }
  });
}

function findUser (req, res) {
  User.findOne(req.params).lean().then(user => {
    res.send(200, user);
  });
}

function getProjectsForUser (req, res) {
  Project.queryWithNotes({user: ObjectId(req.params._id)}).then(projects => {
    res.send(200, projects);
  });
}

module.exports = (server) => {
  server.get("users/:_id", findUser);
  server.get("users/:_id/projects", getProjectsForUser);
  
  server.post('users', createUser);
};