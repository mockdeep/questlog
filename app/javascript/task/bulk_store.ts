import {request} from "helpers/request";

import appStore from "../_common/app_store";
import TaskStore from "./store";
import {fetchTasks} from "./action_creators";

const BulkTaskStore: BulkTaskStoreType = {
  listeners: [],
  loaded: false,
  models: [],
  name: "bulk_task",
  url: "/bulk_task",

  subscribe(listener) {
    this.listeners.push(listener);

    return this.unsubscribe.bind(this, listener);
  },

  unsubscribe(listener): void {
    const index = this.listeners.indexOf(listener);

    this.listeners.splice(index, 1);
  },

  notifyListeners(): void {
    if (!this.listeners) { return; }

    this.listeners.forEach(listener => { listener(); });
  },

  unload(): void {
    this.loaded = false;
    this.notifyListeners();
  },

  update(attrs): void {
    const data = {[this.name]: attrs};

    request(this.url, {data, success: this.unload.bind(this)});
  },
};

BulkTaskStore.subscribe(() => {
  TaskStore.unload();
  appStore.dispatch(fetchTasks());
});
export default BulkTaskStore;
