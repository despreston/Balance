'use strict';
const User             = require('../../models/User');
const Bookmark         = require('../../models/Bookmark');
const Project          = require('../../models/Project');
const AccessControl    = require('../../utils/access-control');
const s3remove         = require('../../utils/s3-remove');
const compose          = require('../../utils/compose');
const Notification     = require('../../classes/notification/');
const config           = require('../../config.json');
const err              = require('restify-errors');
const NewFriendRequest = Notification.NewFriendRequest;

module.exports = ({ get, post, del, put }) => {

  get("users/search", async ({ params }, res, next) => {
    try {
      if (!params.q) {
        return next(new err.BadRequestError('Missing parameter q'));
      }

      let users = await User
        .find({ $or: [
          {
            $and: [
              { name: new RegExp(`\\b${params.q}`, 'i') },
              { hideName: false }
            ]
          },
          { username: new RegExp(`\\b${params.q}`, 'i') }
        ]})
        .select('name userId picture friends username bio hideName')
        .lean();

      users = users.map(User.handleHideNameForUser);

      return res.send(200, users);
    } catch (e) {
      return next(new err.InternalServerError(e));
    }
  });

  get("users/:userId", async ({ params, user }, res, next) => {
    try {
      let result = await User.findOne(params).lean();

      if (!result) {
        return next(new err.NotFoundError())
      }

      const privacyLevel = await AccessControl.many(
        { user: params.userId },
        user.sub
      );

      const project_count = await Project.projectCountForUser(
        result.userId,
        privacyLevel
      );

      const bookmark_count = await Bookmark.count({ userId: params.userId });
      const payload = Object.assign(result, { project_count, bookmark_count });

      return res.send(200, payload);
    } catch (e) {
      return next(new err.InternalServerError(e));
    }
  });

  get("users/:userId/bookmarks", async ({ params, user }, res, next) => {
    try {
      const fns = [];
      const bookmarks = await Bookmark
        .find({ userId: params.userId })
        .select('project');

      const projects = await Project
        .find({ _id: { $in: bookmarks.map(bookmark => bookmark.project) } })
        .populate(Project.latestPastNote)
        .populate(Project.latestFutureNote)
        .populate('nudgeUsers', 'userId picture');

      // user has some bookmarks and the user is not the logged in user
      if (projects.length > 0 && params.userId !== user.sub) {
        const userIds = users => users.map(user => user.userId);
        const isAccepted = friend => friend.status === 'accepted';

        const hasPermission = friends => ({ user: owner, privacyLevel }) => {
          return (
            friends.includes(owner)   ||
            privacyLevel === 'global' ||
            owner === user.sub
          );
        };

        const friends = await User
          .find({ userId: params.userId })
          .select('friends')
          .lean();

        const acceptedFriendUserIds = userIds(friends.filter(isAccepted));

        fns.push(projects => {
          return projects.filter(hasPermission(acceptedFriendUserIds));
        });
      }

      fns.push(projects => projects.map(p => p.toObject({ virtuals: true })));
      fns.push(projects => projects.map(Project.futureAndPastNotes));

      const payload = compose(fns)(projects);
      return res.send(200, payload);
    } catch (e) {
      return next(new err.InternalServerError(e));
    }
  });

  get("users/:userId/friends", async ({ params }, res, next) => {
    try {
      const user = await User
        .findOne({ userId: params.userId })
        .select('friends')
        .lean();

      if (params.status) {
        user.friends = user.friends.filter(f => f.status === params.status);
      }

      let friendIDs = user.friends.map(f => f.userId);

      let friends = await User
        .find({ userId: { $in: friendIDs } })
        .select('name userId picture username bio hideName')
        .lean();

      friends = friends.map(User.handleHideNameForUser);

      return res.send(200, friends);
    } catch (e) {
      return next(new err.InternalServerError(e));
    }
  });

  post("users/:userId/friends/:friend", async ({ params, user }, res, next) => {
    try {
      if (params.userId !== user.sub) {
        return next(new err.ForbiddenError());
      }

      // Cannot send a request to yourself
      if (params.friend === user.sub) {
        return next(new err.ForbiddenError());
      }

      let updatedUsers = await User.createFriendship(
        params.userId,
        params.friend
      );

      // If its blank, it means no users were updated (maybe users were already
      // friends?)
      if (updatedUsers.length > 0) {
        let [ loggedInUser, otherUser ] = updatedUsers;
        loggedInUser = loggedInUser.toObject();
        otherUser = otherUser.toObject();

        // project counts for both users
        loggedInUser.project_count = await Project.projectCountForUser(
          loggedInUser.userId,
          ['private', 'global', 'friends']
        );

        otherUser.project_count = await Project.projectCountForUser(
          params.friend,
          ['global']
        );

        // bookmark count for both users
        loggedInUser.bookmark_count = await Bookmark.count({
          userId: loggedInUser.userId
        });

        otherUser.bookmark_count = await Bookmark.count({
          userId: otherUser.userId
        });

        updatedUsers = [ loggedInUser, otherUser ];
      }

      return res.send(201, updatedUsers);
    } catch (e) {
      return next(new err.InternalServerError(e));
    }
  });

  del("users/:userId/friends/:friend", async ({ params, user }, res, next) => {
    try {
      if (params.userId !== user.sub) {
        return next(new err.ForbiddenError());
      }

      let [ loggedInUser, otherUser ] = await User.removeFriendship(
        params.userId, params.friend
      );

      loggedInUser = loggedInUser.toObject();
      otherUser = otherUser.toObject();

      // project counts for both users
      loggedInUser.project_count = await Project.projectCountForUser(
        user.sub,
        ['private', 'global', 'friends']
      );

      otherUser.project_count = await Project.projectCountForUser(
        params.friend,
        ['global']
      );

      // bookmark count for both users
      loggedInUser.bookmark_count = await Bookmark.count({
        userId: loggedInUser.userId
      });

      otherUser.bookmark_count = await Bookmark.count({
        userId: otherUser.userId
      });

      // remove any lingering notifications from friend request
      NewFriendRequest.remove(params.friend, loggedInUser._id);
      NewFriendRequest.remove(params.friend, otherUser._id);

      return res.send(200, [ loggedInUser, otherUser ]);
    } catch (e) {
      return next(new err.InternalServerError(e));
    }
  });

  post("users", async ({ body, user }, res, next) => {
    try {
      body = JSON.parse(body);

      let newUser = await User.findOne({ userId: body.userId });

      if (newUser) {
        const bucketUrl = `https://${config.s3.Bucket}`;
        const isUserUploaded = pic => pic.includes(bucketUrl);

        // user uploaded their own pic, dont overwrite it
        if (newUser.picture && isUserUploaded(newUser.picture)) {
          delete body.picture;
        }

        newUser = Object.assign(newUser, body);
      } else {
        newUser = new User(body);
      }

      newUser.save();
      newUser = newUser.toObject();

      const privacyLevels = await AccessControl.many(
        { user: body.userId },
        user.sub
      );

      newUser.project_count = await Project.projectCountForUser(
        user.sub,
        privacyLevels
      );

      newUser.bookmark_count = await Bookmark.count({ userId: newUser.userId });

      return res.send(201, newUser);
    } catch (e) {
      return next(new err.InternalServerError(e));
    }
  });

  put('users/:userId', async ({ params, body, user }, res, next) => {
    try {
      // trying to update another user
      if (params.userId !== user.sub) {
        return next(new err.ForbiddenError());
      }

      body = JSON.parse(body);

      let userToUpdate = await User.findOne({ userId: params.userId });

      // user does not exist
      if (!userToUpdate) {
        return next(new err.NotFoundError());
      }

      // need to update the picture
      if (
        body.picture &&
        userToUpdate.picture &&
        body.picture !== userToUpdate.picture
      ) {
        await s3remove(userToUpdate.picture);
      }

      userToUpdate = Object.assign(userToUpdate, body);
      userToUpdate.save();

      const project_count = await Project.projectCountForUser(
        params.userId,
        ['global', 'friends', 'private']
      );

      const bookmark_count = await Bookmark.count({ userId: user.sub });

      const payload = Object.assign(userToUpdate.toObject(), {
        project_count,
        bookmark_count
      });

      return res.send(200, payload);
    } catch (e) {
      return next(new err.InternalServerError(e));
    }
  });

};
