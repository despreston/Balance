/**
 *  Main starting point for Balance server
 */
const port      = 9000;
const restify   = require('restify');
const server    = restify.createServer();
const mongoose  = require('mongoose');
const recursive = require('recursive-readdir');
const dbUrl     = 'mongodb://127.0.0.1:27017/balance';
const logging   = require('./utils/log');
const auth      = require('./auth');

// mongoose promise library is deprecated. Use standard es6 lib instead
mongoose.Promise = global.Promise;
mongoose.connect(dbUrl, { useMongoClient: true });

server.pre(restify.pre.sanitizePath());
server.use(restify.plugins.queryParser({ mapParams: true }));
server.use(restify.plugins.bodyParser({ mapParams: true }));
server.use(logging);
server.use(auth);

// load routes
recursive('./routes', (err, files) => {
  let methods = {
    get: server.get.bind(server),
    put: server.put.bind(server),
    post: server.post.bind(server),
    del: server.del.bind(server)
  };

  files.forEach(file => {
    require('./'+file)(methods);
  });
});

// load models
recursive('./models', (err, files) => {
  files.forEach(file => {
    require('./'+file);
  });
});

server.listen(port);
