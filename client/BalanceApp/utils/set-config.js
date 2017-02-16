const defaults = require('../config/default');
const dev = require('../config/development') || {};

global.CONFIG = Object.assign({}, defaults, dev);