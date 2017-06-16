let jwt = require('restify-jwt');
let config = require('./config.json');

const skippedUrls = [
  '/',
  '_health',
  'users/search',
  'notes/global_activity',
  'projects/:_id'
];

let jwtCheck = jwt({
  secret: config.auth.secret,
  audience: config.auth.id
});

module.exports = (req, res, next) => {

  if (req.headers.authorization) {
    return jwtCheck(req, res, next);
  }

  if (skippedUrls.indexOf(req.route.path) < 0) {
    return jwtCheck(req, res, next);
  }

  next();
};