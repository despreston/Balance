'use strict';
const User = require('../../models/User');
const Project = require('../../models/Project');
const log = require('logbro');
const AccessControl = require('../../utils/access-control');
const s3remove = require('../../utils/s3-remove');
const Notification = require('../../classes/notification/');
const NewFriendRequest = Notification.NewFriendRequest;

module.exports = ({ get, post, del, put }) => {

  get("users/search", ({ params }, res) => {
    if (!params.q) {
      return res.send(400, 'Missing parameter q');
    }

    User
    .find({ $or: [
      { name: new RegExp(`\\b${params.q}`, 'i') },
      { username: new RegExp(`\\b${params.q}`, 'i') }
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

  get("users/:userId/friends/requests", ({ params }, res) => {
    User
    .findOne({ userId: params.userId })
    .select('friends')
    .lean()
    .then(user => {
      if (!user) {
        return res.send(200, []);
      }
      
      const friendIds = user.friends
        .filter(f => f.status === 'requested')
        .map(f => f.userId);

      return User
        .find({ userId: { $in: friendIds } })
        .select('name userId picture friends username bio')
        .lean()
        .then(friends => res.send(200, friends))
        .catch(err => res.send(500, err));
    })
    .catch(err => res.send(500, err));
  });

  get("users/:userId/friends", (req, res) => {
    User
    .findOne({ userId: req.params.userId })
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
    .then(([ loggedInUser, otherUser ]) => {
      loggedInUser = loggedInUser.toObject();
      otherUser = otherUser.toObject();

      // Get project counts for both users
      return Promise.all([
        Project.projectCountForUser(user.sub, ['private', 'global', 'friends']),
        Project.projectCountForUser(params.friend, ['global'])
      ]).then(([ loggedInUserProjectCount, otherUserProjectCount ]) => {
        loggedInUser.project_count = loggedInUserProjectCount;
        otherUser.project_count = otherUserProjectCount;
        return [loggedInUser, otherUser];
      })
      .catch(err => {
        log.error('Could not get project count for users', err);
        return res.send(500);
      });

    })
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
    try {
      body = JSON.parse(body);
    } catch (e) {
      log.error(e);
      return res.send(500);
    }

    /**
     * - If the user does not exist, create it.
     * - Get the project count for the user.
     * - send the user with 201 status
     */
    User.findOne({ userId: body.userId })
    .then(newUser => {
      if (newUser) {
        // user already has a picture. Don't override it
        if (newUser.picture) {
          delete body.picture;
        }

        return Object.assign(newUser, body);
      }
      
      return new User(body);
    })
    .then(newUser => {
      newUser.save(err => {
        if (err) {
          log.eror(err);
          return res.send(500);
        }
      });
      return newUser;
    })
    .then(newUser => {
      /** 
       * At the moment this includes all privacy levels, but I'd rather it follow
       * the same pattern as the other routes in case something changes in
       * access-control
       */
      AccessControl.many({ user: body.userId }, user.sub)
      .then(privacyLevel => Project.projectCountForUser(user.sub, privacyLevel))
      .then(project_count => Object.assign(newUser, { project_count }))
      .then(user => res.send(201, user))
      .catch(err => {
        log.error(err);
        return res.send(500, err)
      });
    })
    .catch(err => {
      log.error(err);
      return res.send(500, err);
    });
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

      if (body.picture && user.picture && body.picture !== user.picture) {
        return s3remove(user.picture).then(() => user);
      }

      return user;
    }).then(user => {
      user = Object.assign(user, body);
      user.save();

      return Project.projectCountForUser(params.userId, ['global', 'friends', 'private'])
        .then(project_count => Object.assign(user.toObject(), { project_count }))
        .then(user => res.send(200, user));
    })
    .catch(err => {
      log.error(err);
      return res.send(500, err);
    });
  });

};