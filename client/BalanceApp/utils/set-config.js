const defaults = require('../config/default').default;
const dev = require('../config/development').default;

export default Object.assign({}, defaults, dev);