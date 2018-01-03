import grab from 'src/_helpers/grab';
import request from 'src/_helpers/request';
import TaskStore from 'src/task/store';
import {
  calculateMaxMinutes,
  timeframeList,
  timeframeNameForTask,
} from 'src/timeframe/utils';

let medianProductivity;

const TimeframeStore = {
  listeners: [],
  loaded: false,
  models: [],
  name: 'timeframe',
  url: '/timeframes',

  subscribe(listener) {
    this.listeners = [...this.listeners, listener];

    return this.unsubscribe.bind(this, listener);
  },

  unsubscribe(listener) {
    const index = this.listeners.indexOf(listener);

    this.listeners.splice(index, 1);
  },

  notifyListeners() {
    if (!this.listeners) { return; }

    this.listeners.forEach((listener) => listener());
  },

  unload() {
    this.loaded = false;
    this.notifyListeners();
  },

  updateModels(data) {
    const {tasks} = data;
    const timeframes = {};

    timeframeList.forEach((timeframeName) => {
      timeframes[timeframeName] = {
        name: timeframeName,
        currentTasks: [],
        pendingTasks: [],
      };
    });

    tasks.forEach((task) => {
      const timeframeName = timeframeNameForTask(task);

      if (task.pending) {
        grab(timeframes, timeframeName).pendingTasks.push(task);
      } else {
        grab(timeframes, timeframeName).currentTasks.push(task);
      }
    });

    this.models = timeframeList.map((timeframeName) => {
      const timeframe = grab(timeframes, timeframeName);

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
      if (!TaskStore.getState().loaded) {
        TaskStore.dispatch({type: 'tasks/FETCH'});
      }

      request({
        method: 'get',
        url: this.url,
        success: (timeframeData) => {
          ({medianProductivity} = timeframeData.meta);

          this.updateModels(TaskStore.getState());
          resolve(this.getState());
        },
      });
    });
  },
};

TaskStore.subscribe(() => { TimeframeStore.unload(); });

export default TimeframeStore;
