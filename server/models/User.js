const bro = require("logbro");
const mongoose = require("mongoose");
const friend = require("./shared/friend");

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

  // url for picture
  picture: String,

  createdAt: Date

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
  return new Promise ( (resolve) => {
    this.findOne({ userId: userA }, 'friends', (err, result) => {
      if (err) {
        bro.error("Could not determine if users are friends. ", err);
      }

      if (result) {
        resolve(result.friends.some(f => {
          return f.userId === userB && f.status === 'accepted' }
        ));
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
 */
User.statics.createFriendship = function (requester, receiver) {

  return this
    .findOne({ userId: requester })
    .select('name userId picture friends username')
    .then(user => {

      const friendIdx = user.friends.findIndex(friend => {
        return friend.userId === receiver;
      });

      // users do not appear in each other's friends lists
      if (friendIdx < 0) {

        user.friends.push({ userId: receiver, status: 'pending' });
        user.save();

        return this
          .findOne({ userId: receiver })
          .select('name userId picture friends username')
          .then(requestedFriend => {
            requestedFriend.friends.push({
              userId: requester,
              status: 'requested'
            });

            return requestedFriend.save()
              .then(updatedRequestedUser => [user, updatedRequestedUser])
              .catch(err => err);
          });

      }

      // Friend request has already been sent
      else if (user.friends[friendIdx].status === 'pending') {
        return;
      }

      // requested user had already sent a request. So accept it! 
      else if (user.friends[friendIdx].status === 'requested') {

        // update the requester's friend list
        user.friends.set(friendIdx, { userId: receiver, status: 'accepted' });
        
        user.save();

        // update the receiver's friend list
        return this
          .findOne({ userId: receiver })
          .select('name userId picture friends username')
          .then(requestedFriend => {

            const friendIdx = requestedFriend.friends.findIndex(friend => {
              return friend.userId === requester;
            });

            requestedFriend.friends.set(friendIdx, {
              userId: requester,
              status: 'accepted'
            });
            
            return requestedFriend.save()
              .then(updatedRequestedUser => [user, updatedRequestedUser])
              .catch(err => err);
          });
      }
    });
};

/**
 * Removes the friendship between two users
 * @param {String} userA userId of first user
 * @param {String} userB userId of second user
 * @return {Promise}
 */
User.statics.removeFriendship = function (userA, userB) {

  return this
    .find({ userId: { $in: [ userA, userB ] } })
    .select('name userId picture friends username')
    .then(users => {
      let [userA, userB] = users;
      let userBIndex = userA.friends.findIndex(f => f.userId === userB.userId);
      let userAIndex = userB.friends.findIndex(f => f.userId === userA.userId);

      // Users are not friends. Don't do anything
      if (userBIndex < 0 || userAIndex < 0) {
        Promise.reject('Users are not friends');
      }

      userA.friends.splice(userBIndex);
      userB.friends.splice(userAIndex);

      return Promise.all([ userA.save(), userB.save() ])
        .then(users => users)
        .catch(err => err);
    });

};

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

