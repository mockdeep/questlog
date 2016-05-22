'use strict';

const Record = require('immutable').Record;
const sum = require('lodash').sum;

const TimeBalancer = require('time_balancer');
const timeframeNameMap = require('timeframe_name_map');

const Timeframe = new Record({
  currentTasks: [],
  pendingTasks: [],
  medianProductivity: null,
  name: null
});

const baseBalance = function (name) {
  const balanceTime = window.balanceTime;

  return TimeBalancer.baseBalances(balanceTime)[name];
};

const calculateMaxMinutes = function (name, medianProductivity) {
  const baseMinutes = baseBalance(name);

  if (typeof baseMinutes === 'undefined') {
    return Infinity;
  } else {
    const minuteMax = Math.floor(baseMinutes * medianProductivity / 60);

    return name === 'today' ? minuteMax : Math.floor(minuteMax / 2);
  }
};

Object.defineProperty(Timeframe.prototype, 'minuteTotal', {
  get: function () {
    const allTasks = this.pendingTasks.concat(this.currentTasks);

    return sum(allTasks, 'estimate_minutes');
  }
});

Object.defineProperty(Timeframe.prototype, 'minuteMax', {
  get: function () {
    if (!this._minuteMax) {
      this._minuteMax = calculateMaxMinutes(this.name, this.medianProductivity);
    }

    return this._minuteMax;
  }
});

Object.defineProperty(Timeframe.prototype, 'title', {
  get: function () {
    return timeframeNameMap[this.name];
  }
});

module.exports = Timeframe;
