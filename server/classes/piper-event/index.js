const http = require('http');
const log = require('logbro');
const config = require('../../config.json');

/**
 * Construct a PiperEvent message to be sent to the Piper-socket server
 */
class PiperEvent {

  /**
   * @param {string} type The type of event
   * @param {string} to the socketio room to send the event to
   * @param {string} payload
   */
  constructor (type, to, payload) {
    if (!type || typeof type !== 'string') {
      throw "'type' should be a string.";
    }

    if (!to || typeof to !== 'string') {
      throw "PiperEvent param 'to' should be a string.";
    }

    if (!payload || typeof payload !== 'string') {
      throw "PiperEvent param 'payload' should be a string.";
    }

    this.type = type;
    this.to = to;
    this.payload = payload;
  }

  send () {
    const req = http.request({
      hostname: config.piper_socket.host,
      port: config.piper_socket.port,
      path: '/event',
      method: 'POST'
    });

    req.on('error', (e) => {
      log.error(`problem with PiperEvent request: ${e.message}`);
    });

    // write data to request body
    req.write(JSON.stringify({ type: this.type, to: this.to, payload: this.payload }));
    req.end();
  }

}

module.exports = (...args) => new PiperEvent(...args);