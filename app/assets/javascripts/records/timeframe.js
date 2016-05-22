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

function baseBalance(name) {
  const balanceTime = window.balanceTime;

  return TimeBalancer.baseBalances(balanceTime)[name];
}

function calculateMaxMinutes(name, medianProductivity) {
  const baseMinutes = baseBalance(name);

  if (typeof baseMinutes === 'undefined') { return Infinity; }

  const minuteMax = Math.floor(baseMinutes * medianProductivity / 60);

  return name === 'today' ? minuteMax : Math.floor(minuteMax / 2);
}

Object.defineProperty(Timeframe.prototype, 'minuteTotal', {
  get() {
    const allTasks = this.pendingTasks.concat(this.currentTasks);

    return sum(allTasks, 'estimate_minutes');
  }
});

Object.defineProperty(Timeframe.prototype, 'minuteMax', {
  get() {
    if (!this._minuteMax) {
      this._minuteMax = calculateMaxMinutes(this.name, this.medianProductivity);
    }

    return this._minuteMax;
  }
});

Object.defineProperty(Timeframe.prototype, 'title', {
  get() {
    return timeframeNameMap[this.name];
  }
});

module.exports = Timeframe;
