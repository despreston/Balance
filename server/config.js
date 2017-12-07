const config = {
  "dev": {
    "port": 9000,
    "db": {
      "host": "mongodb://127.0.0.1",
      "port": 27017,
      "name": "balance"
    },
    "piper_socket": {
      "port": 9001,
      "host": "localhost"
    },
    "auth": {
      "id": "i2jnTYoRsPs7br7KrMX52LgfH9YeThlz",
      "secret": "6voFOFAP0UX010pEB4-eSYGKlC_BQieC6Ujhm-5A4chwrK_KBMYr9GtBwLncUqkM"
    },
    "s3": {
      "Bucket": "balanceappdev"
    },
    "apn": {
      "certLocation": "/var/balance/cert.pem",
      "keyLocation": "/var/balance/key.pem"
    }
  },
  "production": {
    "port": 9000,
    "db": {
      "host": "mongodb://127.0.0.1",
      "port": 27017,
      "name": "balance"
    },
    "piper_socket": {
      "port": 9001,
      "host": "localhost"
    },
    "auth": {
      "id": "i2jnTYoRsPs7br7KrMX52LgfH9YeThlz",
      "secret": "6voFOFAP0UX010pEB4-eSYGKlC_BQieC6Ujhm-5A4chwrK_KBMYr9GtBwLncUqkM"
    },
    "s3": {
      "Bucket": "balanceappdev"
    },
    "apn": {
      "certLocation": "/var/balance/cert.pem",
      "keyLocation": "/var/balance/key.pem"
    }
  }
};

module.exports = config[process.env.NODE_ENV || 'dev'];
