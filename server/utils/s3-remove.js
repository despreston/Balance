/**
 * Removes an object from the s3 bucket by Key value
 */

const aws = require('aws-sdk');
const config = require('../../config.json');
const s3 = new aws.S3();

module.exports = (Key) => {
  const params = {
    Bucket: config.s3.Bucket,
    Delete: {
      Objects: [{ Key }],
    },
  };

  return s3.deleteObjects(params, err => {
    if (err) {
      throw `Could not delete ${Key} from s3`;
    }

    return;
  });
};