module.exports = ({ method, url, params, body}, res, next) => {

  const bro = require('logbro');

  let colors = {
    blue: '34',
    yellow: '33'
  };

  function colorize (color, text) {
    if (typeof color !== 'string') {
      throw "color must be a string";
    }

    if (typeof text !== 'string') {
      throw "text must be a string";
    }
    
    if (!colors[color]) {
      throw "Can't find color";
    }

    return `\x1b[${colors[color]}m${text}\x1b[0m:`;
  }

  let out = `${colorize('blue', 'INCOMING REQUEST')} ${method} - ${colorize('yellow', url)}`;
  
  if (params) {
    out += ` PARAMS: ${JSON.stringify(params)}`
  }

  if (body) {
    out += ` BODY: ${JSON.stringify(body)}`
  }

  bro.info(out);

  next();

};