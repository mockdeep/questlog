'use strict';

var _ = require('lodash');
var request = require('../helpers').request;

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

var medianProductivity;

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
      var timeframeName = task.timeframe || 'inbox';
      if (task.pending) {
        timeframes[timeframeName].pendingTasks.push(task);
      } else {
        timeframes[timeframeName].currentTasks.push(task);
      }
    });
    this.models = timeframeList.map(function (timeframeName) {
      return timeframes[timeframeName];
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
        this.updateModels(data);
        request({
          method: 'get',
          url: this.url(),
          success: function (data) {
            medianProductivity = data.meta.medianProductivity;
            resolve(this.getData());
          }.bind(this)
        });
      }.bind(this));
    }.bind(this));
  }
});

TaskStore.on('change', function () { TimeframeStore.unload(); });

module.exports = TimeframeStore;
