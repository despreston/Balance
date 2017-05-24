/**
 * Removes an object from the s3 bucket by file url
 */

const aws = require('aws-sdk');
const config = require('../config.json');

aws.config.loadFromPath('./aws-config.json');

const s3 = new aws.S3();

module.exports = (url) => {
  return new Promise((resolve, reject) => {
    const Key = url.slice(url.indexOf('.com/') + 5);

    const params = {
      Bucket: config.s3.Bucket,
      Delete: {
        Objects: [{ Key }],
      },
    };

    return s3.deleteObjects(params, err => {
      if (err) {
        return reject(`Could not delete ${Key} from s3`);
      }

      return resolve();
    });
  });
};