'use strict';

var Record = require('immutable').Record;
var _ = require('lodash');

var TimeBalancer = require('../time_balancer');
var timeframeNameMap = require('../timeframe_name_map');

var Timeframe = new Record({
  currentTasks: [],
  pendingTasks: [],
  medianProductivity: null,
  name: null
});

Object.defineProperty(Timeframe.prototype, 'minuteTotal', {
  get: function () {
    var allTasks = this.pendingTasks.concat(this.currentTasks);
    return _.sum(allTasks, 'estimate_minutes');
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

function calculateMaxMinutes(name, medianProductivity) {
  var baseMinutes = baseBalance(name);
  if (typeof baseMinutes === 'undefined') {
    return Infinity;
  } else {
    return Math.floor(baseMinutes * medianProductivity / 60);
  }
}

function baseBalance(name) {
  var balanceTime = window.balanceTime;
  return TimeBalancer.base_balances(balanceTime)[name];
}

module.exports = Timeframe;
