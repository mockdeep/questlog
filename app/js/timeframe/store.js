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

  unload() {
    this.loaded = false;
    this.notifyListeners();
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
    return new Promise((resolve) => {
      TaskStore.getAll().then((data) => {
        request({
          method: 'get',
          url: this.url(),
          success: (timeframeData) => {
            ({medianProductivity} = timeframeData.meta);

            this.updateModels(data);
            resolve(this.getState());
          },
        });
      });
    });
  },
};

TaskStore.subscribe(function unloadTimeframeStore() {
  TimeframeStore.unload();
});

export default TimeframeStore;
