/* eslint no-console: "off" */

/**
 * Uploads a picture to s3
 * @param {string} filename The name generated from Balance API
 * @param {string} path URI of the file on the device
 * @param {string} signedUri The signed Uri from Balance API
 * @return {promise}
 */
export default (filename, path, signedUri) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.onload = () => {
      if (xhr.status === 200) {
        // Successfully uploaded the file.
        return resolve();
      } else {
        // The file could not be uploaded.
        return reject("Error uploading to S3");
      }
    }

    xhr.open('PUT', signedUri);
    xhr.setRequestHeader('X-Amz-ACL', 'public-read');
    xhr.setRequestHeader('Content-Type', 'image/jpeg');
    xhr.send({ uri: path, type: 'image/jpeg', name: filename });
  });
}