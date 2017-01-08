/**
 *  Main starting point for Balance server
 */
'use strict';
const port = process.env.PORT || 9000;
const restify = require('restify');
const server = restify.createServer();

require("./routes")(server);

server.listen(port, () => {
  console.log(`Listening as ${server.name} at ${server.url}`);
});