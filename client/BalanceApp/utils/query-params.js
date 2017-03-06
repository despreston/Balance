/**
 * Formats query params into url string
 * @param {array} params key/val object pairs. key = param, value = param value
 * e.g [{test: 'hello'}, {something: 'blah'}] --> '?test=hello&something=blah'
 */
export default function formatQueryParams (params) {

  return params.reduce((queryParam, pair, index) => {
    let key = Object.keys(pair);
    queryParam += `${key}=${pair[key]}`;

    if (index < params.length-1) {
      queryParam += '&';
    }
    
    return queryParam;
  }, '?');

}