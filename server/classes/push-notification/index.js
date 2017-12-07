const Device       = require('../../models/Device');
const Notification = require('../../models/Notification');
const apn          = require('apn');
const config       = require('../../config');

const options = {
  cert: config.apn.certLocation,
  key: config.apn.keyLocation,
  production: true
};

const apnProvider = new apn.Provider(options);

/**
 * Create and call send() to send a push notification
 * @param {string} receiver The userId of the person to receive the push notification
 * @param {string} alert The message to send
 */
class PushNotification {

  constructor (receiver, alert) {
    if (!receiver || typeof receiver !== 'string') {
      throw 'Receiver (string) is required param for PushNotification';
    }

    this.receiver = receiver;
    this.note = new apn.Notification({ alert, topic: 'com.Balance' });
  }

  /**
   * Augments this.note w/ the badge number
   * @return {Promise}
   */
  async setBadge () {
    try {
      const count = await Notification
        .count({ userId: this.receiver, readAt: { $exists: false } });

      this.note.badge = count;
    } catch (e) {
      throw 'Error getting badge count in PushNotification: ' + e;
    }
  }

  /**
   * Gets the device tokens for the receiver
   * @return {Promise} resolves with device tokens for all of the user's devices
   */
  async getDeviceTokens () {
    try {
      const devices = await Device.find({ userId: this.receiver });
      return devices.map(device => device.deviceToken);
    } catch (e) {
      throw 'Error getting devices for Push Notification receiver: ' + e;
    }
  }

  async send () {
    try {
      await this.setBadge();
      const deviceTokens = await this.getDeviceTokens();
      const result = await apnProvider.send(this.note, deviceTokens);

      if (result.failed.length > 0) {
        throw 'Failed to send notification through apnProvider';
      }
    } catch (e) {
      throw 'Error sending push notification: ' + e;
    }
  }

}

module.exports = (...args) => new PushNotification(...args);
