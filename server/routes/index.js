/**
 * Relays health of server
 */
'use strict';
module.exports = server => {
  server.get('_health', (req, res, next) => {
    res.status(200);
    res.send('Server seems to be working.');
    next();
  })
};