const log = require('logbro');
const aws = require('aws-sdk');
const uuidV4 = require('uuid/v4');
const config = require('../../config.json');

module.exports = ({ get }) => {

  get('signed-s3', ({ params }, res) => {
    if (!params.fileType) {
      return res.send(400, 'Missing fileType param');
    }

    const s3 = new aws.S3();
    const fileName = uuidV4();
    const fileType = params.fileType;

    const s3Params = {
      Bucket: config.s3.Bucket,
      Key: fileName,
      ContentType: fileType,
      ACL: 'public-read'
    };

    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if (err) {
        log.error(err);
        return res.send(500);
      }

      const response = {
        signedRequest: data,
        url: `https://${config.s3.Bucket}.s3.amazonaws.com/${fileName}`
      };

      return res.send(200, response);
    });
  });

};