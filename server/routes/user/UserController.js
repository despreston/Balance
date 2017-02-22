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
    "users", ({ params, body }, res) => {
      body = JSON.parse(body);

      if (!body.createdAt) {
        body.createdAt = new Date()
      }

      User.findOneAndUpdate(
        { userId: body.userId },
        body,
        { upsert: true, new: true, setDefaultsOnInsert: true },
        (err, result) => {

          if (err) {
            return res.send(500, 'Failed ' + err);
          }

          return res.send(201, result);

        });
    });

};