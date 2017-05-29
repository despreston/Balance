const Device = require('../../models/Device');
const User = require('../../models/User');
const log = require('logbro');

module.exports = ({ post, put }) => {

  put('devices/:_id', ({ params, user }, res) => {
    Device
    .findOne({ _id: params._id })
    .then(device => {
      if (!device) return res.send(404);

      device = Object.assign(device, params);
      device.save();

      return device;
    })
    .then(device => res.send(200, device))
    .catch(err => {
      log.error(err);
      return res.send(500);
    });
  });

  post('devices', ({ params, user }, res) => {
    params.userId = user.sub;

    Device
    .create(params)
    .then(device => {
      // Add the device to the User's doc
      return User
      .findOne({ userId: user.sub })
      .then(user => {
        user.devices.push(device);
        user.save();
        return device;
      });
    })
    .then(device => res.send(201, device))
    .catch(err => {
      log.error(err);
      return res.send(500);
    });
  });

};