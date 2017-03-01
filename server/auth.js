let jwt = require('restify-jwt');
let config = require('./config.json');

const skippedUrls = ['/', '/_health'];

let jwtCheck = jwt({
  secret: config.auth.secret,
  audience: config.auth.id
});

module.exports = (req, res, next) => {
  if (skippedUrls.indexOf(req.url) < 0) {
    return jwtCheck(req, res, next);
  }

  next();
};