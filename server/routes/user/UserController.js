'use strict';
const User = require('../../models/User');

function createUser(req, res) {
  const requiredParams = ['firstName', 'lastName', 'email'];
  for (const param of requiredParams) {
    if (!req.params[param]) {
      res.send(409, {
        title: "Missing parameter: " + param
      });
    }
  }

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

module.exports = server => {
  server.get("users/:_id", findUser);
  server.post('users', createUser);
};