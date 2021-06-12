import { helper } from '@ember/component/helper';

const calc = (interval, cycle) => Math.floor(cycle / interval);

function convertDate([timestamp], { timeNow = Date.now() }) {
  const timeInSec = Math.abs(Math.floor(timeNow - timestamp * 1000) / 1000);
  const mins = calc(60, timeInSec);
  const hours = calc(60, mins);
  const days = calc(24, hours);
  const weeks = calc(7, days);
  const months = calc(30, days);
  const years = calc(12, months);
  let result = years;
  let cycle = 'year';

  if (timeInSec < 1) {
    return 'just now';
  }

  if (years > 0) {
    result = years;
    cycle = 'year';
  } else if (months > 0) {
    result = months;
    cycle = 'month';
  } else if (weeks > 0) {
    result = weeks;
    cycle = 'week';
  } else if (days > 0) {
    result = days;
    cycle = 'day';
  } else if (hours > 0) {
    result = hours;
    cycle = 'hour';
  } else if (mins > 0) {
    result = mins;
    cycle = 'minute';
  } else {
    result = '';
    cycle = 'few seconds';
  }

  if (timestamp * 1000 > timeNow)
    return `in ${result} ${cycle}${result > 1 ? 's' : ''}`;
  return `${result} ${cycle}${result > 1 ? 's ago' : ' ago'}`;
}

export default helper(convertDate);
