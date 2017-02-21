let jwt = require('restify-jwt');
let config = require('./config.json');

let jwtCheck = jwt({
  secret: config.auth.secret,
  audience: config.auth.id
});

module.exports = jwtCheck;