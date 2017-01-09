/**
 *  Main starting point for Balance server
 */
'use strict';
const port = 9000;
const restify = require('restify');
const server = restify.createServer();
const mongoose = require('mongoose');
const recursive = require('recursive-readdir');
const dbUrl = 'mongodb://127.0.0.1:27017/balance';
const routeHelper = require('./middleware/route_helpers');

mongoose.connect(dbUrl);
server.pre(restify.pre.sanitizePath());

recursive('./routes', function (err, files) {
  files.forEach(file => {
    require('./'+file)(server, routeHelper);
  });
});

recursive('./models', function (err, files) {
  files.forEach(file => {
    require('./'+file);
  });
});

server.listen(port);