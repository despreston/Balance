'use strict';
const User             = require('../../models/User');
const Bookmark         = require('../../models/Bookmark');
const Project          = require('../../models/Project');
const Note             = require('../../models/Note');
const AccessControl    = require('../../utils/access-control');
const s3remove         = require('../../utils/s3-remove');
const compose          = require('../../utils/compose');
const Notification     = require('../../classes/notification/');
const config           = require('../../config');
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

      const payload = {
        ...result,
        project_count,
        bookmark_count
      };

      return res.send(200, payload);
    } catch (e) {
      return next(new err.InternalServerError(e));
    }
  });

  get("users/:userId/stats", async ({ params, user }, res, next) => {
    try {
      const now = Date.now();
      const twoDays = 1.728e8;

      const stats = {
        mostUpdatedProject: null,
        mostPopularProject: null,
        finishedProjects: 0,
        streak: 0,
        avgTimeBetweenUpdates: 0
      };

      const fullUser = await User.findOne({ userId: params.userId });

      const isFriend = !!fullUser.friends.find(friend => {
        return friend.userId === user.sub && friend.status === 'accepted';
      });

      const projects = await Project.find({ user: params.userId });

      const notes = await Note
        .find({ user: params.userId })
        .sort('lastUpdated');

      const censorPrivateProject = project => {
        const { privacyLevel, user: owner } = project;
        const belongsToLoggedInUser = user.sub === owner;

        if (
          (privacyLevel === 'private' && !belongsToLoggedInUser) ||
          (privacyLevel === 'friends' && !(belongsToLoggedInUser || isFriend))
        ) {
          return 'Private';
        }

        return project;
      }

      // Streak
      for (let i = notes.length - 1; i >= 0; i--) {
        const lastUpdated = notes[i].lastUpdated.getTime();

        // 1st note
        if (i === notes.length - 1) {
          if (now - lastUpdated < twoDays) {
            stats.streak = stats.streak + 1;
          } else {
            break;
          }
        } else {
          const prev = notes[i + 1].lastUpdated.getTime();

          if (prev - lastUpdated < twoDays) {
            stats.streak = stats.streak + 1;
          } else {
            break;
          }
        }
      }

      // Average Time Between Update
      stats.avgTimeBetweenUpdates = notes.reduceRight((avg, note, i) => {
        const lastUpdated = new Date(note.lastUpdated).getTime();

        if (i === notes.length - 1) {
          return parseInt(now - lastUpdated);
        }

        const previous = new Date(notes[i + 1].lastUpdated).getTime();

        return parseInt(avg + (previous - lastUpdated) / (notes.length - i));
      }, 0);

      const bookmarks = await Bookmark.find({
        project: projects.map(project => project._id)
      });

      const fullProject = _id => projects.find(project => {
        return project._id.toString() === _id;
      });

      const bookmarksByProject = bookmarks.reduce((obj, bookmark) => {
        if (obj[bookmark.project]) {
          obj[bookmark.project] = obj[bookmark.project] + 1;
        } else {
          obj[bookmark.project] = 1;
        }

        return obj;
      }, {});

      // Most Popular Project
      const mostPopularProject = Object.entries(bookmarksByProject)
        .sort(([, val1], [, val2]) => val1 > val2)
        .pop();

      if (mostPopularProject) {
        stats.mostPopularProject = {
          project: censorPrivateProject(fullProject(mostPopularProject[0])),
          bookmarkCount: mostPopularProject[1]
        }
      }

      // Most Updated project
      const updatesByProject = notes.reduce((obj, note) => {
        const project = note.project.toString();

        if (obj[project]) {
          obj[project].push( note );
        } else {
          obj[project] = [note];
        }

        return obj;
      }, {});

      const mostUpdatedProject = Object.entries(updatesByProject)
        .sort(([, val1], [, val2]) => val1.length > val2.length)
        .pop();

      if (mostUpdatedProject) {
        stats.mostUpdatedProject = {
          project: censorPrivateProject(fullProject(mostUpdatedProject[0])),
          updates: mostUpdatedProject[1].length
        };
      }

      // Finished projects
      stats.finishedProjects = projects.filter(({ status }) => {
        return status === 'finished';
      }).length;

      return res.send(200, stats);
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

      let newUser = await User.findOne({ userId: body.user_id });

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
        { user: body.user_id },
        user.sub
      );

      newUser.project_count = await Project.projectCountForUser(
        user.sub,
        privacyLevels
      );

      newUser.bookmark_count = await Bookmark.count({ userId: newUser.user_id });

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

      userToUpdate = { ...userToUpdate, body };
      userToUpdate.save();

      const project_count = await Project.projectCountForUser(
        params.userId,
        ['global', 'friends', 'private']
      );

      const bookmark_count = await Bookmark.count({ userId: user.sub });

      const payload = {
        ...userToUpdate.toObject(),
        project_count,
        bookmark_count
      };

      return res.send(200, payload);
    } catch (e) {
      return next(new err.InternalServerError(e));
    }
  });

};
