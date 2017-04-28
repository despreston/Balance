export function formatDate (date) {
  return date.toLocaleDateString([], {
    month: 'numeric',
    day: 'numeric',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function arrayToObj (array, key) {
  if (array.length === 0) {
    return {};
  }
  
  return Object.assign(...array.map(el => {
    return { [el[key]] : el }; 
  }));
}