'use strict';

const moment = require('moment');

const daysBetween = function (startTime, endTime) {
  return endTime.diff(startTime, 'days');
};

const timeframes = function (time) {
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
    year: daysBetween(endOfQuarter, endOfYear)
  };
};

const TimeBalancer = {
  baseBalances: function (time) {
    return timeframes(moment(time));
  }
};

module.exports = TimeBalancer;
