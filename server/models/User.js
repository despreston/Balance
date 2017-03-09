const bro = require("logbro");
const mongoose = require("mongoose");

let User = new mongoose.Schema({

  name: {
    type: String,
    index: true,
    required: true
  },

  displayName: {
    type: String,
    index: true
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

  friends: [ String ],

  lastUpdated: Date,

  // url for picture
  picture: String,

  createdAt: Date

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

  if (!this.displayName) {
    this.displayName = this.name;
  }

  if (!this.createdAt) {
    this.createdAt = new Date();
  } else {
    delete this.createdAt;
  }
  
  // Keep user from changing these properties indirectly
  const excludedProperties = ['lastUpdated', 'userId'];
  excludedProperties.forEach(prop => delete this[prop]);

  this.lastUpdated = new Date();

  next();

});

module.exports = mongoose.model("user", User);

