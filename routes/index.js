'use strict';

module.exports = server => {
  server.get('/', (req, res) => {
    res.send(200, "You've reached Balance");
  });
};