const Device = require('../../models/Device');
const log = require('logbro');

module.exports = ({ post, put, get }) => {

  get('devices', async ({ params, user }, res) => {
    try {
      const devices = await Device.find({ userId: user.sub });
      return res.send(200, devices);
    } catch (e) {
      log.error(e);
      return res.send(500);
    }
  });

  put('devices/:_id', async ({ params, user }, res) => {
    try {
      let device = await Device.findOne({ _id: params._id });

      if (!device) return res.send(404);

      device = Object.assign(device, params);
      device.save();

      return res.send(200, device);
    } catch (e) {
      log.error(e);
      return res.send(500);
    }
  });

  post('devices', async ({ body, user }, res) => {
    try {
      body = JSON.parse(body);
      body.userId = user.sub;

      const device = await Device.create(body);

      return res.send(201, device);
    } catch (e) {
      log.error(e);
      return res.send(403);
    }
  });

};