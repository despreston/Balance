'use strict';
const User = require('../../models/User');

function createUser(req, res) {
  User.create(req.params).then((err, newUser) => {
    if (err) {
      res.send(500);  
    } else {
      res.send(204, newUser);
    }
  });
}

function findUser(req, res) {
  User.findOne(req.params).then(user => {
    res.send(200, user);
  });
}

module.exports = (server) => {
  server.get("users/:_id", findUser);
  server.post('users', createUser);
};