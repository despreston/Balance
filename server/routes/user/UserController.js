'use strict';
const User = require('../../models/User');
const Project = require('../../models/Project');

module.exports = (server) => {

  server.get(
  "users/search", ({ params }, res) => {
    User
    .find({ $or: [ 
      { name: new RegExp(`^${params.q}`, 'i') },
      { username: new RegExp(`^${params.q}`, 'i') }
    ]})
    .select('name userId picture friends username')
    .lean()
    .then(users => res.send(200, users))
    .catch(err => res.send(500, err));
  });

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
          .select('name userId picture friends username')
          .lean()
          .then(friends => res.send(200, friends))
          .catch(err => res.send(500, err));
      })
      .catch(err => res.send(500, err));
    });
  
  server.post(
    "users", ({ params, body }, res) => {
      body = JSON.parse(body);

      /**
       * - If the user does not exist, create it.
       * - Get the project count for the user.
       * - send the user with 201 status
       */
      User.findOne({ userId: body.userId })
        .then(user => user ? Object.assign(user, body) : new User(user))
        .then(user => user.save())
        .then(user => {
          return Project.projectCountForUser(user.userId)
            .then(project_count => {
              const obj = Object.assign({}, user.toObject(), { project_count });
              res.send(201, obj);
            })
            .catch(err => res.send(500, err));
        })
        .catch(err => res.send(500, err));
      });

  server.put(
    'users/:userId', ({ params, body, user }, res) => {
      body = JSON.parse(body);

      if (params.userId !== user.sub) {
        res.send(403);
      }

      User
      .findOne({ userId: params.userId })
      .then(user => {
        user = Object.assign(user, body);
        user.save();
        res.send(200, user);
      })
      .catch(err => res.send(500, err));
    });

};