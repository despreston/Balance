import { get, set } from 'lodash';
/**
 * Converts all dateProps fields to date objects.
 * Handles nested objects as well
 * @param {Object} obj
 * @return {Object} 
 */
export default function convertDates (json) {
  const dateProps = ['createdAt', 'lastUpdated'];
  let obj = Object.assign({}, json);

  if (Array.isArray(json)) {
    return json.map(singleObj => {
      obj = singleObj;
      traverse('');
      return singleObj;
    });
  }

  traverse('');
  return obj;

  function traverse (path) {
    let nestedObj;

    if (path !== '') {
      nestedObj = get(obj, path);
    } else {
      nestedObj = obj;
    }
    
    if (!nestedObj) {
      return;
    }

    Object.keys(nestedObj).forEach(prop => {
      if (typeof nestedObj[prop] === 'object') {
        let oldPath = path;
        if (path !== '') {
          path += `.${prop}`;  
        } else {
          path = prop
        }
        traverse(path);
        path = oldPath;
      }

      if (dateProps.indexOf(prop) !== -1) {
        let pathPlusProp;

        if (path !== '') {
          pathPlusProp = `${path}.${prop}`;
        } else {
          pathPlusProp = prop;
        }

        set(obj, pathPlusProp, new Date(get(obj, pathPlusProp)));
      }
    });
  }

};

