import request from 'js/_helpers/request';
import TaskStore from 'js/task/store';
import {
  calculateMaxMinutes,
  timeframeList,
  timeframeNameForTask,
} from 'js/timeframe/utils';

let medianProductivity;

const TimeframeStore = {
  listeners: [],
  loaded: false,
  models: [],
  name: 'timeframe',

  subscribe(listener) {
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
