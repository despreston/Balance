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
//const auth = require('./auth');
const logging = require('./logging');

// mongoose promise library is deprecated. Use standard es6 lib instead
mongoose.Promise = global.Promise;

mongoose.connect(dbUrl);

server.pre(restify.pre.sanitizePath());

// server.use(auth.initialize());
// server.use(auth.session());
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.use(logging);

recursive('./routes', (err, files) => {
  files.forEach(file => {
    require('./'+file)(server, routeHelper);
  });
});

recursive('./models', (err, files) => {
  files.forEach(file => {
    require('./'+file);
  });
});

server.listen(port);