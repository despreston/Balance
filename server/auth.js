const jwt = require('restify-jwt');
const config = require('./config.json');

const skippedUrls = [
  '/',
  '_health',
  'users/search',
  'users/:userId/stats',
  'notes/global_activity',
  'projects/:_id',
  'explore/popular',
  'explore/updated',
  'explore/new',
  'explore/summary'
];

const jwtCheck = jwt({
  secret: config.auth.secret,
  audience: config.auth.id
});

module.exports = (req, res, next) => {
  if (req.headers.authorization) {
    return jwtCheck(req, res, next);
  }

  if (!skippedUrls.includes(req.route.path)) {
    if (!req.headers.authorization) {
      return res.send(401, 'Authorization required');
    }

    return jwtCheck(req, res, next);
  }

  next();
};
