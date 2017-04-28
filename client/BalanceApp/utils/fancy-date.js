/**
 * Takes a date and returns some pretty text
 * date < 1mins ago --> "xxs"
 * 59secs < date < 1hr --> "xxm"
 * 1hr < date < 1day --> "xxh"
 * 1 day < date --> "xxd"
 *
 * @param {Date} date
 * @return {String}
 */
export default function prettyDate(date) {
  const today = new Date();
  
  function round (ugly, div) {
    return Math.round(Math.abs(ugly) / div);
  }

  const daysSinceUpdate = round((date.getTime() - today), 1000);
  
  if (daysSinceUpdate < 60) {
    return `${daysSinceUpdate}s`;
  }
  
  if (daysSinceUpdate < 3600) {
    return `${round(daysSinceUpdate, 60)}m`;
  }
  
  if (daysSinceUpdate < 86400) {
    return `${round(daysSinceUpdate, 3600)}h`;
  }
  
  
  return `${round(daysSinceUpdate, 86400)}d`;
}