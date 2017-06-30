const mongoose = require("mongoose");
const friend = require("./shared/friend");
const Notification = require('../classes/notification/');
const { NewFriendRequest, AcceptedFriendRequest } = Notification;

let User = new mongoose.Schema({

  name: {
    type: String,
    index: true,
    required: true,
    trim: true,
    minLength: [ 2, 'The value of `{PATH}` (`{VALUE}`) does not meet the minimum length ({MINLENGTH}).']
  },

  username: {
    type: String,
    index: true,
    trim: true,
    minLength: [ 2, 'The value of `{PATH}` (`{VALUE}`) does not meet the minimum length ({MINLENGTH}).']
  },

  userId: {
    required: true,
    type: String,
    index: true,
    unique: true
  },

  email: {
    index: true,
    trim: true,
    type: String
  },

  friends: [ friend ],

  lastUpdated: Date,

  picture: String,

  createdAt: Date,

  bio: String,

  hideName: {
    type: Boolean,
    default: false
  }

});

/**
 * Returns true if the userA is a friend of userB and the friendship status is
 * 'accepted'.
 *
 * @param {string} userA userId of first user
 * @param {string} userB userId of second user
 * @return {promise} resolve to a boolean
 */
User.statics.areFriends = function (userA, userB) {
  return new Promise(resolve => {
    this.findOne({ userId: userA }, 'friends', (err, result) => {
      if (err) {
        throw "Could not determine if users are friends. " + err;
      }

      if (result) {
        resolve(result.friends.some(f => {
          return f.userId === userB && f.status === 'accepted'
        }));
      }

      resolve(false);
    });
  });
};

/**
 * Creates or updates a friendship between two users
 *
 * If receiver does not exist in the requester's list of friends,
 * add the requester to the receiver's friends list w/ status 'requested',
 * and add the receiver to the requester's friends list w/ status 'pending'.
 *
 * If receiver exists in friends list & status is 'pending', resolve.
 *
 * If receiver exists in friends list & status is 'requested', change status in
 * both user's friends list to 'accepted'.
 *
 * @param {String} requester userId user requesting a friendship
 * @param {String} receiver userId the requester wants to be friends w/
 * @return {Promise} resolves with an array containing both updated users.
 *                   This will be blank if no users were updated.
 */
User.statics.createFriendship = async function (requester, receiver) {
  try {
    let user = await this
      .findOne({ userId: requester })
      .select('name userId picture friends username bio');

    let friendIdx = user.friends.findIndex(friend => {
      return friend.userId === receiver;
    });

    // users do not appear in each other's friends lists
    if (friendIdx < 0) {
      user.friends.push({ userId: receiver, status: 'pending' });
      user.save();

      let requestedFriend = await this
        .findOne({ userId: receiver })
        .select('name userId picture friends username bio');

      requestedFriend.friends.push({
        userId: requester,
        status: 'requested'
      });

      // create notification for receiver
      new NewFriendRequest(receiver, user._id).save();

      const updatedRequestedUser = await requestedFriend.save();

      return [user, updatedRequestedUser];
    }

    // Friend request has already been sent
    else if (user.friends[friendIdx].status === 'pending') {
      return [];
    }

    // requested user had already sent a request. So accept it!
    else if (user.friends[friendIdx].status === 'requested') {

      // update the requester's friend list
      user.friends.set(friendIdx, { userId: receiver, status: 'accepted' });

      user.save();

      // update the receiver's friend list
      let requestedFriend = await this
        .findOne({ userId: receiver })
        .select('name userId picture friends username bio');

      friendIdx = requestedFriend.friends.findIndex(friend => {
        return friend.userId === requester;
      });

      requestedFriend.friends.set(friendIdx, {
        userId: requester,
        status: 'accepted'
      });

      const updatedRequestedUser = await requestedFriend.save();

      // create notification for receiver
      new AcceptedFriendRequest(receiver, user._id).save();

      return [user, updatedRequestedUser];
    }
  } catch (e) {
    return e;
  }
};

/**
 * Removes the friendship between two users
 * @param {String} userA userId of first user
 * @param {String} userB userId of second user
 * @return {Promise} resolves with array of both users
 */
User.statics.removeFriendship = async function (userA, userB) {
  try {
    const users = await this
      .find({ userId: { $in: [ userA, userB ] } })
      .select('name userId picture friends username bio');

    [userA, userB] = users;
    let userBIndex = userA.friends.findIndex(f => f.userId === userB.userId);
    let userAIndex = userB.friends.findIndex(f => f.userId === userA.userId);

    // Users are not friends. Don't do anything
    if (userBIndex < 0 || userAIndex < 0) {
      throw 'Users are not friends';
    }

    userA.friends.splice(userBIndex);
    userB.friends.splice(userAIndex);

    await userA.save();
    await userB.save();

    return [ userA, userB ];
  } catch (e) {
    return e;
  }
};

/**
 * remove names if the user opt'd to hide their name
 * @param {Object} user - remove name and hideName from this user
 * @return {Object}
 */
User.statics.handleHideNameForUser = function (user) {
  if (user.hideName) {
    delete user.name;
  }

  delete user.hideName;

  return user;
}

User.pre('save', function (next) {
  if (!this.username) {
    this.username = this.name;
  }

  if (!this.createdAt) {
    this.createdAt = new Date();
  } else {
    delete this.createdAt;
  }

  this.lastUpdated = new Date();

  next();
});

module.exports = mongoose.model("user", User);

