'use strict';
const User = require('../../models/User');
const Project = require('../../models/Project');

module.exports = (server) => {

  server.get(
    "users/:userId", (req, res) => {
      User
      .findOne(req.params)
      .lean()
      .then(user => {
        return Project.projectCountForUser(user.userId).then(projectCount => {
          user.project_count = projectCount;
          res.send(200, user);
        });
      });
    });

  server.get(
    "users/:userId/friends", (req, res) => {
      User
      .findOne(req.params)
      .select('friends')
      .lean()
      .then(user => {
        return User
          .find({ userId: { $in: user.friends } })
          .select('name userId picture friends')
          .lean()
          .then(friends => res.send(200, friends));
      });
    });
  
  server.post(
    "users", ({ params, body }, res) => {
      body = JSON.parse(body);

      User.findOneAndUpdate(
        { userId: body.userId },
        body,
        { upsert: true, new: true, setDefaultsOnInsert: true },
        (err, user) => {

          if (err) {
            return res.send(500, 'Failed ' + err);
          }

          return Project.projectCountForUser(user.userId).then(project_count => {
            res.send(201, Object.assign({}, user.toObject(), { project_count }));
          });

        });
    });

};