import {request} from "helpers/request";
import TaskChangeNotifier from "../task/change_notifier";

let medianProductivity: number;

/*
 * The server lays the timeframes out; a timeframe with no maximum comes back
 * with a null minuteMax, which reads more naturally here as Infinity.
 */
function processTimeframe(timeframe: TimeframeData): Timeframe {
  return {...timeframe, minuteMax: timeframe.minuteMax ?? Infinity};
}

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
    this.listeners.forEach((listener) => { listener(); });
  },

  unload(): void {
    this.loaded = false;
    this.notifyListeners();
  },

  getState() {
    return {
      timeframes: this.models,
      meta: {medianProductivity},
    };
  },

  getAll() {
    return new Promise(resolve => {
      request(this.url, {
        method: "GET",
        success: (payload: TimeframePayload) => {
          ({medianProductivity} = payload.meta);
          this.models = payload.data.map(processTimeframe);
          this.loaded = true;
          resolve(this.getState());
        },
      });
    });
  },
};

TaskChangeNotifier.subscribe(() => { TimeframeStore.unload(); });

export default TimeframeStore;
