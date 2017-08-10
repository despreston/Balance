const Device = require('../../models/Device');
const err    = require('restify-errors');

module.exports = ({ post, put, get }) => {

  get('devices', async ({ user }, res, next) => {
    try {
      const devices = await Device.find({ userId: user.sub });
      return res.send(200, devices);
    } catch (e) {
      return next(new err.InternalServerError(e));
    }
  });

  put('devices/:_id', async ({ params }, res, next) => {
    try {
      let device = await Device.findOne({ _id: params._id });

      if (!device) {
        return next(new err.NotFoundError());
      }

      device = Object.assign(device, params);
      device.save();

      return res.send(200, device);
    } catch (e) {
      return next(new err.InternalServerError(e));
    }
  });

  post('devices', async ({ body, user }, res, next) => {
    try {
      body = JSON.parse(body);

      Device.update(
        { deviceToken: body, userId: user.sub },
        { $set: { deviceToken: body, lastUpdated: new Date() } },
        { upsert: true }
      ).exec();

      return res.send(201, {});
    } catch (e) {
      return next(new err.InternalServerError(e));
    }
  });

};
