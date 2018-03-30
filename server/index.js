/**
 *  Main starting point for Balance server
 */
const conf          = require('./config');
const restify       = require('restify');
const server        = restify.createServer();
const mongoose      = require('mongoose');
const recursive     = require('recursive-readdir');
const logging       = require('./utils/log');
const auth          = require('./utils/auth');
const errorHandlers = require('./utils/error-handlers');

// mongoose promise library is deprecated. Use standard es6 lib instead
mongoose.Promise = global.Promise;

const { db } = conf;
mongoose.connect(`${db.host}:${db.port}/${db.name}`, { useMongoClient: true });

server.pre(restify.pre.sanitizePath());
server.use(restify.plugins.queryParser({ mapParams: true }));
server.use(restify.plugins.bodyParser({ mapParams: true }));
server.use(logging);
server.use(auth);

// Error handlers
Object.entries(errorHandlers).forEach(([ name, fn ]) => {
  server.on(name, fn);
});

// load routes
recursive('./routes', (err, files) => {
  const methods = {
    get: server.get.bind(server),
    put: server.put.bind(server),
    post: server.post.bind(server),
    del: server.del.bind(server)
  };

  files = files.filter(file => file.includes('.js'));

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

server.listen(conf.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Started server at port ${conf.port}`);
});
