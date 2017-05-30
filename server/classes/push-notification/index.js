const Device       = require('../../models/Device');
const Notification = require('../../models/Notification');
const apn          = require('apn');
const config       = require('../../config.json');

const options = {
  cert: config.apn.certLocation,
  key: config.apn.keyLocation,
  production: false
};

const apnProvider = new apn.Provider(options);

class PushNotification {

  constructor (receiver, alert) {
    if (!receiver || typeof receiver !== 'string') {
      throw 'Receiver (string) is required param for PushNotification';
    }

    this.receiver = receiver;
    this.note = new apn.Notification({ alert, topic: 'com.Balance' });
  }

  /**
   * Sets the badge number to the number of unread notifications
   * @return {Promise}
   */
  setBadge () {
    return Notification
    .count({ userId: this.receiver, readAt: { $exists: false } })
    .then(count => this.note.badge = count)
    .catch(err => {
      throw 'Error getting badge count in PushNotification: ' + err;
    });
  }

  /**
   * Gets the device tokens for the receiver
   * @return {Promise} resolves with device tokens for all of the user's devices
   */
  getDeviceTokens () {
    return Device
    .find({ userId: this.receiver })
    .then(devices => devices.map(device => device.deviceToken))
    .catch(err => {
      throw 'Error getting devices for Push Notification receiver: ' + err;
    });
  }

  send () {
    return this.setBadge()
    .then(() => this.getDeviceTokens())
    .then(deviceTokens => apnProvider.send(this.note, deviceTokens));
  }

}

module.exports = (...args) => new PushNotification(...args);
