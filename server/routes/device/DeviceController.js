const Device = require('../../models/Device');
const log = require('logbro');

module.exports = ({ post, put, get }) => {

  get('devices', ({ params, user }, res) => {
    Device
    .find({ userId: user.sub })
    .then(devices => res.send(200, devices))
    .catch(err => {
      log.error(err);
      return res.send(500);
    });
  });

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

  post('devices', ({ body, user }, res) => {
    try {
      body = JSON.parse(body);
      body.userId = user.sub;
    } catch (e) {
      log.error(e);
      return res.send(403);
    }

    Device
    .create(body)
    .then(device => res.send(201, device))
    .catch(err => {
      log.error(err);
      return res.send(500);
    });
  });

};