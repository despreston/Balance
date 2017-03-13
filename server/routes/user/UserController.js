'use strict';
const User = require('../../models/User');
const Project = require('../../models/Project');

module.exports = (server) => {

  server.get(
  "users/search", ({ params }, res) => {
    if (!params.q) {
      return res.send(400, 'Missing parameter q');
    }

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
        const friendIds = user.friends.map(f => f.userId);

        return User
          .find({ userId: { $in: friendIds } })
          .select('name userId picture friends username')
          .lean()
          .then(friends => res.send(200, friends))
          .catch(err => res.send(500, err));
      })
      .catch(err => res.send(500, err));
    });

  server.post(
    "users/:userId/friends", ({ params, user }, res) => {

      if (params.userId !== user.sub) {
        return res.send(403);
      }

      // Cannot send a request to yourself
      if (params.friend === user.sub) {
        return res.send(403);
      }
      
      User.createFriendship(params.userId, params.friend)
      .then(() => res.send(201))
      .catch(err => res.send(500, err));

    });

  server.del(
    "users/:userId/friends/:friend", ({ params, user }, res) => {

      if (params.userId !== user.sub) {
        return res.send(403);
      }

      User.removeFriendship(params.userId, params.friend)
      .then(() => res.send(204))
      .catch(err => res.send(500, err));
    })
  
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