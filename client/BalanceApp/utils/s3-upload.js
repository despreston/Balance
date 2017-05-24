import ImageResizer from 'react-native-image-resizer';
import { api } from './api';

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
 * @param {number} width
 * @param {number} height
 * @return {Promise}
 */
const resize = (path, width, height) => {
  return ImageResizer.createResizedImage(path, width, height, 'JPEG', 100);
};

export default (source, width = 1080, height = 1440) => {
  let url;

  return api(`signed-s3?fileType=JPG`)
    .then(data => {
      url = data.url;
      return resize(source, width, height)
        .then(resizedUri => upload(data.fileName, resizedUri, data.url));
    })
    .then(() => url);
};