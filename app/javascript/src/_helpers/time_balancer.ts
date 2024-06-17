import type {Moment} from 'moment';
import moment from 'moment';

function daysBetween(startTime: Moment, endTime: Moment) {
  return endTime.diff(startTime, 'days');
}

export type TimeBalance = {
  [timeframeName in TimeframeName]?: number;
};

function timeframes(time: Moment): TimeBalance {
  const endOfWeek = moment(time).endOf('week');
  let endOfMonth = moment(time).endOf('month');

  if (endOfMonth.isBefore(endOfWeek)) { endOfMonth = endOfWeek; }

  let endOfQuarter = moment(time).endOf('quarter');

  if (endOfQuarter.isBefore(endOfWeek)) { endOfQuarter = endOfWeek; }

  let endOfYear = moment(time).endOf('year');

  if (endOfYear.isBefore(endOfWeek)) { endOfYear = endOfWeek; }

  return {
    today: 1,
    week: daysBetween(time, endOfWeek),
    month: daysBetween(endOfWeek, endOfMonth),
    quarter: daysBetween(endOfMonth, endOfQuarter),
    year: daysBetween(endOfQuarter, endOfYear),
  };
}

const TimeBalancer = {
  baseBalances() {
    return timeframes(moment());
  },
};

export default TimeBalancer;
