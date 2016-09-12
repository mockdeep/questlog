'use strict';

const extend = require('lodash').extend;
const request = require('_helpers/request');

const moment = require('moment');

// eslint-disable-next-line global-require
const Promise = window.Promise || require('promise-polyfill');

const Timeframe = require('timeframe/model');
const RestfulStore = require('_common/restful_store');
const TaskStore = require('stores/task_store');

const timeframeList = [
  'inbox',
  'today',
  'week',
  'month',
  'quarter',
  'year',
  'lustrum',
  'decade'
];

const timeframeEnds = {
  today: moment().endOf('day'),
  week: moment().endOf('week'),
  month: moment().endOf('month'),
  quarter: moment().endOf('quarter'),
  year: moment().endOf('year')
};

let medianProductivity;

function timeframeNameForPendingTask(task) {
  const releaseAt = moment(task.release_at);
  let index = timeframeList.indexOf(task.timeframe) - 1;
  let timeframeName;
  let timeframeEnd;

  do {
    index += 1;
    timeframeName = timeframeList[index];
    timeframeEnd = timeframeEnds[timeframeName];
    if (!timeframeEnd) { return timeframeName; }
  } while (releaseAt.diff(timeframeEnd) > 0);

  return timeframeList[index];
}

function timeframeNameForTask(task) {
  if (!task.timeframe) { return 'inbox'; }

  return task.pending ? timeframeNameForPendingTask(task) : task.timeframe;
}

const TimeframeStore = extend({}, RestfulStore, {
  name: 'timeframe',

  updateModels(data) {
    const tasks = data.tasks;
    const timeframes = {};

    timeframeList.forEach(function addTimeframe(timeframeName) {
      timeframes[timeframeName] = {
        name: timeframeName,
        currentTasks: [],
        pendingTasks: []
      };
    });
    tasks.forEach(function addTaskToTimeframe(task) {
      const timeframeName = timeframeNameForTask(task);

      if (task.pending) {
        timeframes[timeframeName].pendingTasks.push(task);
      } else {
        timeframes[timeframeName].currentTasks.push(task);
      }
    });
    this.models = timeframeList.map(function buildTimeframe(timeframeName) {
      const timeframe = timeframes[timeframeName];

      timeframe.medianProductivity = medianProductivity;

      return new Timeframe(timeframe);
    });
  },

  getData() {
    return {
      timeframes: this.models,
      meta: {medianProductivity}
    };
  },

  getAll() {
    return new Promise(function fetchTasks(resolve) {
      TaskStore.getAll().then(function fetchTimeframes(data) {
        request({
          method: 'get',
          url: this.url(),
          success: function loadTimeframeData(timeframeData) {
            medianProductivity = timeframeData.meta.medianProductivity;
            this.updateModels(data);
            resolve(this.getData());
          }.bind(this)
        });
      }.bind(this));
    }.bind(this));
  }
});

TaskStore.on('change', function unloadTimeframeStore() {
  TimeframeStore.unload();
});

module.exports = TimeframeStore;
