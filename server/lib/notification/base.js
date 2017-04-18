const Model = require('../../models/Notification');
const log = require('logbro');

class Notification {

  static remove (query) {
    Model.remove(query, err => {
      if (err) {
        log.error(err);
      }
    });
  }
  
  constructor (user, type, related = []) {

    if (!type || typeof type !== 'string') {
      throw 'Notification type should be a string.';
    }

    if (!Array.isArray(related)) {
      throw 'Notification related should be an array.';
    }

    if (!user || typeof user !== 'string') {
      throw 'Notification user should be a string';
    }

    this.type = type;
    this.related = related;
    this.user = user;
  }

  save () {
    let notification = new Model({
      type: this.type,
      userId: this.user,
      related: this.related,
      createdAt: new Date()
    });

    notification
    .save()
    .catch(err => log.error(err));
  }

}

module.exports = Notification;