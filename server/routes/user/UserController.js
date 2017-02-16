'use strict';
const User = require('../../models/User');

module.exports = (server) => {
  server.get(
    "users/:_id", (req, res) => {
      User
      .findOne(req.params)
      .lean()
      .then(user => res.send(200, user));
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