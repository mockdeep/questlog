import moment from 'moment';

import request from 'js/_helpers/request';
import TaskStore from 'js/task/store';
import {calculateMaxMinutes} from 'js/timeframe/utils';

const timeframeList = [
  'inbox',
  'today',
  'week',
  'month',
  'quarter',
  'year',
  'lustrum',
  'decade',
];

const timeframeEnds = {
  today: moment().endOf('day'),
  week: moment().endOf('week'),
  month: moment().endOf('month'),
  quarter: moment().endOf('quarter'),
  year: moment().endOf('year'),
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

const TimeframeStore = {
  models: [],
  loaded: false,
  name: 'timeframe',

  subscribe(listener) {
    this.listeners = this.listeners || [];
    this.listeners.push(listener);

    return function unsubscribe() {
      const index = this.listeners.indexOf(listener);

      this.listeners.splice(index, 1);
    }.bind(this);
  },

  notifyListeners() {
    if (!this.listeners) { return; }

    this.listeners.forEach((listener) => { listener(); });
  },

  url() {
    return `/${this.name}s`;
  },

  load() {
    request({
      method: 'get',
      url: this.url(),
      success: this.updateModels.bind(this),
    });
  },

  unload() {
    this.loaded = false;
    this.notifyListeners();
  },

  create(attrs) {
    const data = {};

    data[this.name] = attrs;

    return request({
      data,
      url: this.url(),
      method: 'post',
      success: this.unload.bind(this),
    });
  },

  update(id, attrs) {
    const data = {};

    data[this.name] = attrs;

    return request({
      data,
      url: `${this.url()}/${id}`,
      success: this.unload.bind(this),
    });
  },

  destroy(id) {
    return request({
      url: `${this.url()}/${id}`,
      method: 'delete',
      success: this.unload.bind(this),
    });
  },

  updateModels(data) {
    const {tasks} = data;
    const timeframes = {};

    timeframeList.forEach(function addTimeframe(timeframeName) {
      timeframes[timeframeName] = {
        name: timeframeName,
        currentTasks: [],
        pendingTasks: [],
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
      timeframe.minuteMax = calculateMaxMinutes(
        timeframeName,
        medianProductivity
      );

      return timeframe;
    });
  },

  getState() {
    return {
      timeframes: this.models,
      meta: {medianProductivity},
    };
  },

  getAll() {
    return new Promise(function fetchTasks(resolve) {
      TaskStore.getAll().then(function fetchTimeframes(data) {
        request({
          method: 'get',
          url: this.url(),
          success: function loadTimeframeData(timeframeData) {
            ({medianProductivity} = timeframeData.meta);

            this.updateModels(data);
            resolve(this.getState());
          }.bind(this),
        });
      }.bind(this));
    }.bind(this));
  },
};

TaskStore.subscribe(function unloadTimeframeStore() {
  TimeframeStore.unload();
});

export default TimeframeStore;
