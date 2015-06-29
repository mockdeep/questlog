'use strict';

var _ = require('lodash');
var request = require('../helpers').request;
var TimeBalancer = require('../time_balancer');
var timeframeNameMap = require('../timeframe_name_map');

var moment = require('moment');
var Promise = window.Promise || require('promise-polyfill');

var RestfulStore = require('./restful_store');
var TaskStore = require('./task_store');

var timeframeList = [
  'inbox',
  'today',
  'week',
  'month',
  'quarter',
  'year',
  'lustrum',
  'decade'
]

var timeframeEnds = {
  today: moment().endOf('day'),
  week: moment().endOf('week'),
  month: moment().endOf('month'),
  quarter: moment().endOf('quarter'),
  year: moment().endOf('year'),
}

var medianProductivity;

function timeframeNameForPendingTask(task) {
  var index = timeframeList.indexOf(task.timeframe) - 1;
  var timeframeName;
  var timeframeEnd;
  var releaseAt = moment(task.release_at);

  do {
    index += 1;
    timeframeName = timeframeList[index];
    timeframeEnd = timeframeEnds[timeframeName];
    if (!timeframeEnd) { return timeframeName; }
  } while (releaseAt.diff(timeframeEnd) > 0)
  return timeframeList[index];
}

function calculateMinutes(timeframe) {
  var allTasks = timeframe.pendingTasks.concat(timeframe.currentTasks);
  return Math.floor(_.sum(allTasks, 'estimate_seconds') / 60);
}

function baseBalance(timeframeName) {
  var balanceTime = window.balanceTime;
  return TimeBalancer.base_balances(balanceTime)[timeframeName];
}

function calculateMaxMinutes(timeframe) {
  var baseMinutes = baseBalance(timeframe.name);
  if (typeof baseMinutes === 'undefined') {
    return Infinity;
  } else {
    return Math.floor(baseMinutes * medianProductivity / 60);
  }
}

function timeframeNameForTask(task) {
  if (!task.timeframe) { return 'inbox'; }
  return task.pending ? timeframeNameForPendingTask(task) : task.timeframe;
}

var TimeframeStore = _.extend({}, RestfulStore, {
  name: 'timeframe',

  updateModels: function (data) {
    var tasks = data.tasks;
    var timeframes = {};
    timeframeList.forEach(function (timeframeName) {
      timeframes[timeframeName] = {
        name: timeframeName,
        currentTasks: [],
        pendingTasks: []
      };
    });
    tasks.forEach(function (task) {
      var timeframeName = timeframeNameForTask(task);
      if (task.pending) {
        timeframes[timeframeName].pendingTasks.push(task);
      } else {
        timeframes[timeframeName].currentTasks.push(task);
      }
    });
    this.models = timeframeList.map(function (timeframeName) {
      var timeframe = timeframes[timeframeName];
      timeframe.minuteTotal = calculateMinutes(timeframe);
      timeframe.minuteMax = calculateMaxMinutes(timeframe);
      timeframe.title = timeframeNameMap[timeframe.name];
      return timeframe;
    });
  },

  getData: function () {
    return {
      timeframes: this.models,
      meta: {medianProductivity: medianProductivity}
    };
  },

  getAll: function () {
    return new Promise(function (resolve, reject) {
      TaskStore.getAll().then(function (data) {
        request({
          method: 'get',
          url: this.url(),
          success: function (timeframe_data) {
            medianProductivity = timeframe_data.meta.medianProductivity;
            this.updateModels(data);
            resolve(this.getData());
          }.bind(this)
        });
      }.bind(this));
    }.bind(this));
  }
});

TaskStore.on('change', function () { TimeframeStore.unload(); });

module.exports = TimeframeStore;
