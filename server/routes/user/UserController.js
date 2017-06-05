'use strict';
const User             = require('../../models/User');
const Bookmark         = require('../../models/Bookmark');
const Project          = require('../../models/Project');
const log              = require('logbro');
const AccessControl    = require('../../utils/access-control');
const s3remove         = require('../../utils/s3-remove');
const Notification     = require('../../classes/notification/');
const NewFriendRequest = Notification.NewFriendRequest;

module.exports = ({ get, post, del, put }) => {

  get("users/search", async ({ params }, res) => {
    try {
      if (!params.q) {
        return res.send(400, 'Missing parameter q');
      }

      let users = await User
        .find({ $or: [
          { name: new RegExp(`\\b${params.q}`, 'i') },
          { username: new RegExp(`\\b${params.q}`, 'i') }
        ]})
        .select('name userId picture friends username bio')
        .lean();

      return res.send(200, users);
    } catch (e) {
      log.error(e);
      return res.send(500);
    }
  });

  get("users/:userId", async ({ params, user}, res) => {
    try {
      let result = await User
        .findOne(params)
        .lean();

      if (!result) return res.send(404);

      const privacyLevel = await AccessControl.many({ user: params.userId }, user.sub);
      const project_count = await Project.projectCountForUser(result.userId, privacyLevel);
      const bookmark_count = await Bookmark.count({ userId: user.sub });
      const payload = Object.assign(result, { project_count, bookmark_count });

      return res.send(200, payload);
    } catch (e) {
      log.error(e);
      return res.send(500);
    }
  });

  get("users/:userId/friends/requests", async ({ params }, res) => {
    try {
      let user = await User
        .findOne({ userId: params.userId })
        .select('friends')
        .lean();

      if (!user) return res.send(200, []);

      const friendIds = user.friends
        .filter(f => f.status === 'requested')
        .map(f => f.userId);

      const friends = await User
        .find({ userId: { $in: friendIds } })
        .select('name userId picture friends username bio')
        .lean();

      return res.send(200, friends);
    } catch (e) {
      log.error(e);
      return res.send(500);
    }
  });

  get("users/:userId:/bookmarks", async ({ params, user }, res) => {
    try {
      const bookmarks = await Bookmark.find({ userId: params.userId })
        .populate('userId', 'userId username picture');

      return res.send(200, bookmarks);
    } catch (e) {
      log.error(e);
      return res.send(500);
    }
  });

  get("users/:userId/friends", async (req, res) => {
    try {
      const user = await User
        .findOne({ userId: req.params.userId })
        .select('friends')
        .lean();

      const friendIds = user.friends.map(f => f.userId);

      const friends = await User
        .find({ userId: { $in: friendIds } })
        .select('name userId picture friends username bio')
        .lean();

      return res.send(200, friends);
    } catch (e) {
      log.error(e);
      return res.send(500);
    }
  });

  post("users/:userId/friends/:friend", async ({ params, user }, res) => {
    try {
      if (params.userId !== user.sub) {
        return res.send(403);
      }

      // Cannot send a request to yourself
      if (params.friend === user.sub) {
        return res.send(403);
      }

      let [ loggedInUser, otherUser ] = await User.createFriendship(params.userId, params.friend);
      loggedInUser = loggedInUser.toObject();
      otherUser = otherUser.toObject();

      // project counts for both users
      loggedInUser.project_count = await Project.projectCountForUser(user.sub, ['private', 'global', 'friends']);
      otherUser.project_count = await Project.projectCountForUser(params.friend, ['global']);

      return res.send(201, [loggedInUser, otherUser]);
    } catch (e) {
      log.error(e);
      return res.send(500);
    }
  });

  del("users/:userId/friends/:friend", async ({ params, user }, res) => {
    try {
      if (params.userId !== user.sub) return res.send(403);

      const updatedUsers = await User.removeFriendship(params.userId, params.friend);

      // remove any lingering notifications from friend request
      NewFriendRequest.remove(params.friend, updatedUsers[1]._id);
      NewFriendRequest.remove(params.friend, updatedUsers[0]._id);

      return res.send(200, updatedUsers);  
    } catch (e) {
      log.error(e);
      return res.send(500);
    }
  });
  
  post("users", async ({ params, body, user }, res) => {
    try {
      body = JSON.parse(body);

      let newUser = await User.findOne({ userId: body.userId });

      if (newUser) {
        // user already has a picture. Don't override it
        if (newUser.picture) {
          delete body.picture;
        }

        newUser = Object.assign(newUser, body);
      } else {
        newUser = new User(body);
      }

      newUser.save();

      const privacyLevels = await AccessControl.many({ user: body.userId }, user.sub);
      const project_count = await Project.projectCountForUser(user.sub, privacyLevels);

      return res.send(201, Object.assign(newUser, { project_count }));
    } catch (e) {
      log.error(e);
      return res.send(500);
    }
  });

  put('users/:userId', async ({ params, body, user }, res) => {
    try {
      // trying to update another user
      if (params.userId !== user.sub) return res.send(403);
      
      body = JSON.parse(body);
      
      let userToUpdate = await User.findOne({ userId: params.userId });

      // user does not exist
      if (!userToUpdate) return res.send(404);

      // need to update the picture
      if (body.picture && userToUpdate.picture && body.picture !== userToUpdate.picture) {
        await s3remove(userToUpdate.picture);
      }

      userToUpdate = Object.assign(userToUpdate, body);
      userToUpdate.save();

      const project_count = await Project.projectCountForUser(params.userId, ['global', 'friends', 'private']);
      const bookmark_count = await Bookmark.count({ userId: user.sub });
      
      const payload = Object.assign(userToUpdate.toObject(), {
        project_count,
        bookmark_count
      });

      return res.send(200, payload);
    } catch (e) {
      log.error(e);
      return res.send(500);
    }
  });

};