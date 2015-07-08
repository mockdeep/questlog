'use strict';

var Record = require('immutable').Record;
var _ = require('lodash');

var Timeframe = new Record({
  currentTasks: [],
  pendingTasks: [],
  minuteMax: Infinity,
  name: null,
  title: null
});

Object.defineProperty(Timeframe.prototype, 'minuteTotal', {
  get: function () {
    var allTasks = this.pendingTasks.concat(this.currentTasks);
    return _.sum(allTasks, 'estimate_minutes');
  }
});

module.exports = Timeframe;
