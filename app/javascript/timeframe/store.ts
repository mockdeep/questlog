import {grab} from "helpers";
import {request} from "helpers/request";
import TaskStore from "src/task/store";
import {
  calculateMaxMinutes,
  timeframeList,
  timeframeNameForTask,
} from "src/timeframe/utils";

let medianProductivity: number;

const TimeframeStore: TimeframeStoreType = {
  listeners: [],
  loaded: false,
  models: [],
  name: "timeframe",
  url: "/timeframes",

  subscribe(listener) {
    this.listeners = [...this.listeners, listener];

    return this.unsubscribe.bind(this, listener);
  },

  unsubscribe(listener): void {
    const index = this.listeners.indexOf(listener);

    this.listeners.splice(index, 1);
  },

  notifyListeners(): void {
    this.listeners.forEach(listener => listener());
  },

  unload(): void {
    this.loaded = false;
    this.notifyListeners();
  },

  updateModels(data): void {
    const {tasks} = data;
    const timeframes: {[timeframeName in TimeframeName]?: Timeframe} = {};

    timeframeList.forEach(timeframeName => {
      timeframes[timeframeName] = {
        name: timeframeName,
        currentTasks: [],
        pendingTasks: [],
        medianProductivity,
        minuteMax: calculateMaxMinutes(timeframeName, medianProductivity),
      };
    });

    tasks.forEach(task => {
      const timeframeName = timeframeNameForTask(task);

      if (task.pending) {
        grab(timeframes, timeframeName).pendingTasks.push(task);
      } else {
        grab(timeframes, timeframeName).currentTasks.push(task);
      }
    });

    this.models =
      timeframeList.map(timeframeName => grab(timeframes, timeframeName));
  },

  getState() {
    return {
      timeframes: this.models,
      meta: {medianProductivity},
    };
  },

  getAll() {
    return new Promise(resolve => {
      if (!TaskStore.getState().loaded) {
        TaskStore.dispatch({type: "tasks/FETCH"});
      }

      request(this.url, {
        method: "GET",
        success: (timeframeData: TimeframeData) => {
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
