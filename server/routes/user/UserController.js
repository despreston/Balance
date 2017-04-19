'use strict';
const User = require('../../models/User');
const Project = require('../../models/Project');
const AccessControl = require('../../utils/access-control');
const Notification = require('../../lib/notification/');
const NewFriendRequest = Notification.NewFriendRequest;

module.exports = ({ get, post, del, put }) => {

  get("users/search", ({ params }, res) => {
    if (!params.q) {
      return res.send(400, 'Missing parameter q');
    }

    User
    .find({ $or: [
      { name: new RegExp(`^${params.q}`, 'i') },
      { username: new RegExp(`^${params.q}`, 'i') }
    ]})
    .select('name userId picture friends username bio')
    .lean()
    .then(users => res.send(200, users))
    .catch(err => res.send(500, err));
  });

  get("users/:userId", ({ params, user}, res) => {
    User
    .findOne(params)
    .lean()
    .then(result => {
      if (!result) {
        return res.send(404);
      }

      AccessControl.many({ user: params.userId }, user.sub)
      .then(privacyLevel => {
        return Project.projectCountForUser(result.userId, privacyLevel)
          .then(project_count => Object.assign(result, { project_count }))
          .then(user => res.send(200, user));
      });
    })
    .catch(err => res.send(500, err));
  });

  get("users/:userId/friends", (req, res) => {
    User
    .findOne(req.params)
    .select('friends')
    .lean()
    .then(user => {
      const friendIds = user.friends.map(f => f.userId);

      return User
        .find({ userId: { $in: friendIds } })
        .select('name userId picture friends username bio')
        .lean()
        .then(friends => res.send(200, friends))
        .catch(err => res.send(500, err));
    })
    .catch(err => res.send(500, err));
  });

  post("users/:userId/friends/:friend", ({ params, user }, res) => {

    if (params.userId !== user.sub) {
      return res.send(403);
    }

    // Cannot send a request to yourself
    if (params.friend === user.sub) {
      return res.send(403);
    }

    User.createFriendship(params.userId, params.friend)
    .then(updatedUsers => res.send(201, updatedUsers))
    .catch(err => res.send(500, err));

  });

  del("users/:userId/friends/:friend", ({ params, user }, res) => {

    if (params.userId !== user.sub) {
      return res.send(403);
    }

    User.removeFriendship(params.userId, params.friend)
    .then(updatedUsers => {

      // remove any lingering notifications from friend request
      NewFriendRequest.remove(params.friend, updatedUsers[1]._id);
      NewFriendRequest.remove(params.friend, updatedUsers[0]._id);

      return res.send(200, updatedUsers);
    })
    .catch(err => res.send(500, err));

  });
  
  post("users", ({ params, body, user }, res) => {
    body = JSON.parse(body);

    /**
     * - If the user does not exist, create it.
     * - Get the project count for the user.
     * - send the user with 201 status
     */
    User.findOne({ userId: body.userId })
    .then(newUser => newUser ? Object.assign(newUser, body) : new User(body))
    .then(newUser => newUser.save())
    .then(newUser => {

      /** 
       * At the moment this includes all privacy levels, but I'd rather it follow
       * the same pattern as the other routes in case something changes in
       * access-control
       */
      AccessControl.many({ user: body.userId }, user.sub)
      .then(privacyLevel => {
        return Project.projectCountForUser(newUser.userId, privacyLevel)
          .then(project_count => Object.assign(newUser, { project_count }))
          .then(user => res.send(200, user));
      })
      .catch(err => res.send(500, err));
    })
    .catch(err => res.send(500, err));
  });

  put('users/:userId', ({ params, body, user }, res) => {
    body = JSON.parse(body);

    if (params.userId !== user.sub) {
      return res.send(403);
    }

    User
    .findOne({ userId: params.userId })
    .then(user => {
      if (!user) {
        return res.send(404);
      }

      user = Object.assign(user, body);
      user.save();
      return res.send(200, user);
    })
    .catch(err => res.send(500, err));
  });

};