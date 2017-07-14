const Device = require('../../models/Device');
const log = require('logbro');

module.exports = ({ post, put, get }) => {

  get('devices', async ({ user }, res) => {
    try {
      const devices = await Device.find({ userId: user.sub });
      return res.send(200, devices);
    } catch (e) {
      log.error(e);
      return res.send(500);
    }
  });

  put('devices/:_id', async ({ params }, res) => {
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

      Device.update(
        { deviceToken: body, userId: user.sub },
        { $set: { deviceToken: body, lastUpdated: new Date() } },
        { upsert: true }
      ).exec();

      return res.send(201, {});
    } catch (e) {
      log.error(e);
      return res.send(403);
    }
  });

};
