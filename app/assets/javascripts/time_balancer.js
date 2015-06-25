'use strict';

var moment = require('moment');

function daysBetween(startTime, endTime) {
  return endTime.diff(startTime, 'days');
}

function timeframes(time) {
  var endOfWeek = moment(time).endOf('week');
  var endOfMonth = moment(time).endOf('month');
  if (endOfMonth.isBefore(endOfWeek)) { endOfMonth = endOfWeek; }
  var endOfQuarter = moment(time).endOf('quarter');
  if (endOfQuarter.isBefore(endOfWeek)) { endOfQuarter = endOfWeek; }
  var endOfYear = moment(time).endOf('year');
  if (endOfYear.isBefore(endOfWeek)) { endOfYear = endOfWeek; }

  return {
    today: 1,
    week: daysBetween(time, endOfWeek),
    month: daysBetween(endOfWeek, endOfMonth),
    quarter: daysBetween(endOfMonth, endOfQuarter),
    year: daysBetween(endOfQuarter, endOfYear)
  };
}

var TimeBalancer = {
  base_balances: function (time) {
    time = moment(time);
    return timeframes(time);
  }
}

module.exports = TimeBalancer;
