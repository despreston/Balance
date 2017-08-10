const log = require('logbro');

module.exports = {

  restifyError (req, res, err) {
    log.error(err);
  }

};
