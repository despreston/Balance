const log   = require('logbro');
const slack = require('./slack');

module.exports = {

  async restifyError (req, res, err) {
    const message = {
      color: '#ff0000',
      username: 'Jesus Christ',
      pretext: '*Shit broke!*',
      title: 'Balance API Server Error',
      text: `${err}\n\`\`\`\n${err.stack}\n\`\`\``
    };

    log.error(err);
    await slack(message);
  }

};
