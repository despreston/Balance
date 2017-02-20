/**
 *  Main starting point for Balance server
 */
const port = 9000;
const restify = require('restify');
const server = restify.createServer();
const mongoose = require('mongoose');
const recursive = require('recursive-readdir');
const dbUrl = 'mongodb://127.0.0.1:27017/balance';
const log = require('./utils/log');

// mongoose promise library is deprecated. Use standard es6 lib instead
mongoose.Promise = global.Promise;

mongoose.connect(dbUrl);

server.pre(restify.pre.sanitizePath());


server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(log);

recursive('./routes', (err, files) => {
  files.forEach(file => {
    require('./'+file)(server);
  });
});

recursive('./models', (err, files) => {
  files.forEach(file => {
    require('./'+file);
  });
});

server.listen(port);