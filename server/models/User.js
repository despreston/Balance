const bro = require("logbro");
const mongoose = require("mongoose");

let User = new mongoose.Schema({

  name: String,

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

  friends: [ mongoose.Schema.Types.ObjectId ],

  lastUpdated: Date,

  createdAt: Date,

  lastLogin: Date

});

/**
 * Returns true if the userA is a friend of userB by looking up userA
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
        resolve(result.friends.indexOf(userB) !== -1);
      }

      resolve(false);
    });
  });
};

User.pre('save', function(next) {
  // Keep user from changing these properties indirectly
  const excludedProperties = ['lastUpdated', 'userId', 'createdAt'];
  excludedProperties.forEach(prop => delete this[prop]);
  this.lastUpdated = new Date();
  next();
});

module.exports = mongoose.model("user", User);

