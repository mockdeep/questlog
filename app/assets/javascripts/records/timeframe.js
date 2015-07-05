'use strict';

var Record = require('immutable').Record;

var Timeframe = new Record({
  currentTasks: [],
  pendingTasks: [],
  minuteMax: Infinity,
  minuteTotal: null,
  name: null,
  title: null
});

module.exports = Timeframe;
