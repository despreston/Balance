import ImageResizer from 'react-native-image-resizer';

/**
 * Uploads a jpg to s3
 * @param {string} filename The name generated from Balance API
 * @param {string} path URI of image location
 * @param {string} signedUri The signed Uri from Balance API
 * @return {promise}
 */
const upload = (filename, path, signedUri) => {
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
};

/**
 * Resizes the image at path
 * @param {string} path URI of image to resize. should be jpeg
 * @return {Promise}
 */
const resize = (path) => {
  return ImageResizer.createResizedImage(path, 1080, 1440, 'JPEG', 100);
};

export default (filename, path, signedUri) => {
  return resize(path).then((resizedUri) => upload(filename, resizedUri, signedUri));
}