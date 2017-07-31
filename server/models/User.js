const mongoose     = require("mongoose");
const friend       = require("./shared/friend");
const Notification = require('../classes/notification/');
const {
  NewFriendRequest,
  AcceptedFriendRequest
}                  = Notification;
const log          = require('logbro');

let User = new mongoose.Schema({

  name: {
    type: String,
    index: true,
    required: true,
    trim: true,
    minlength: [ 2, 'The value of `{PATH}` (`{VALUE}`) does not meet the minimum length ({MINLENGTH}).']
  },

  username: {
    type: String,
    index: true,
    trim: true,
    minlength: [ 2, 'The value of `{PATH}` (`{VALUE}`) does not meet the minimum length ({MINLENGTH}).'],
    maxlength: [ 25, 'The value of `{PATH}` (`{VALUE}`) exceeds the max length ({MAXLENGTH}).' ]
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

  bio: {
    type: String,
    trim: true,
    maxlength: [ 80, 'The value of `{PATH}` (`{VALUE}`) exceeds the max length ({MAXLENGTH}).' ]
  },

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
    const setStatus = friends => (userId, status) => {
      friends.push({ userId, status });
    };

    const fetchUser = async userId => {
      return this.findOne({ userId })
        .select('name userId picture friends username bio hideName');
    };

    const matchesUser = userIdToMatch => user => user.userId === userIdToMatch;
    let user = await fetchUser(requester);
    const friend = user.friends.find(matchesUser(receiver));

    // friendship does not exist
    if (!friend) {
      let requestedFriend = await fetchUser(receiver);

      setStatus(user.friends)(receiver, 'pending');
      setStatus(requestedFriend.friends)(requester, 'requested');
      await user.save();
      new NewFriendRequest(receiver, user._id).save();

      return [user, await requestedFriend.save()];
    }

    // requested user had already sent a request. So accept it!
    else if (friend.status === 'requested') {
      const setAsAccepted = (friends, userId) => {
        const index = friends.findIndex(matchesUser(userId));
        friends.set(index, { userId, status: 'accepted' });
      };

      let requestedFriend = await fetchUser(receiver);

      setAsAccepted(user.friends, receiver);
      setAsAccepted(requestedFriend.friends, requester);
      await user.save();
      new AcceptedFriendRequest(receiver, user._id).save();

      return [user, await requestedFriend.save()];
    }

    else {
      return [];
    }
  } catch (e) {
    log.warn(e);
    throw e;
  }
};

/**
 * Removes the friendship between two users
 * @param {String} userA userId of first user
 * @param {String} userB userId of second user
 * @return {Promise} resolves with array of both users
 */
User.statics.removeFriendship = async function (userAId, userBId) {
  try {
    const removeFromFriends = ({ friends }, index) => friends.splice(index, 1);

    const indexInFriendsList = (user, { userId }) => {
      return user.friends.findIndex(user => user.userId === userId);
    };

    let [userA, userB] = await this
      .find({ userId: { $in: [ userAId, userBId ] } })
      .select('name userId picture friends username bio hideName');

    const userBIndex = indexInFriendsList(userA, userB);
    const userAIndex = indexInFriendsList(userB, userA);

    // Users are not friends. Don't do anything
    if (userBIndex < 0 || userAIndex < 0) {
      throw 'Users are not friends';
    }

    removeFromFriends(userA, userBIndex);
    removeFromFriends(userB, userAIndex);

    await userA.save();
    await userB.save();

    return [ userA, userB ];
  } catch (e) {
    log.warn(e);
    throw e;
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
