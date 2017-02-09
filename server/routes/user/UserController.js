'use strict';
const User = require('../../models/User');
const Project = require('../../models/Project');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = (server) => {
  server.get(
    "users/:_id", (req, res) => {
      User
      .findOne(req.params)
      .lean()
      .then(user => res.send(200, user));
    });

  server.get(
    "users/:_id/projects", (req, res) => {
      Project
      .queryWithNotes({ user: ObjectId(req.params._id) })
      .then(projects => res.send(200, projects));
    });
  
  server.post(
    "users", (req, res) => {
      User
      .create(req.params)
      .then((err, newUser) => {
        if (err) {
          res.send(500);  
        } else {
          res.send(204, newUser);
        }
      });
    });
};