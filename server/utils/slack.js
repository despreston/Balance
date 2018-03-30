const https = require('https');

const opts = {
  hostname: 'hooks.slack.com',
  path: '/services/T4E913K1S/B9YK46QN8/37rQXwr5TgXgmYsGktDeJUpP',
  method: 'POST'
};

module.exports = async attachment => {
  const message = { attachments: [ attachment ] };
  const request = await https.request(opts);
  request.write(JSON.stringify(message));
  request.end();
};
