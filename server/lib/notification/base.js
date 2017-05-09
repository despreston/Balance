const Model = require('../../models/Notification');
const log = require('logbro');
const PiperEvent = require('../piper-event/');

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
    .save((err, notification) => {
      if (err) {
        log.error('Error saving notification: ', err);
      }

      notification.populate('related.item', (err) => {
        if (err) {
          log.error('Could not populate notification items', err);
        }

        try {
          const e = PiperEvent('notification', `user:${this.user}`, JSON.stringify(notification));
          e.send();
        } catch (e) {
          log.error(e.message || e);
        }
      });
      
    })
    .catch(err => log.error(err));
  }

}

module.exports = Notification;