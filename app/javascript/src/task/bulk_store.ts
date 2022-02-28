import request from 'src/_helpers/request';

import appStore from 'src/app_store';
import TaskStore from 'src/task/store';
import {fetchTasks} from 'src/task/action_creators';

const BulkTaskStore: BulkTaskStoreType = {
  listeners: [],
  loaded: false,
  models: [],
  name: 'bulk_task',
  url: '/bulk_task',

  subscribe(listener) {
    this.listeners.push(listener);

    return this.unsubscribe.bind(this, listener);
  },

  unsubscribe(listener) {
    const index = this.listeners.indexOf(listener);

    this.listeners.splice(index, 1);
  },

  notifyListeners() {
    if (!this.listeners) { return; }

    this.listeners.forEach(listener => { listener(); });
  },

  unload() {
    this.loaded = false;
    this.notifyListeners();
  },

  update(attrs) {
    const data = {[this.name]: attrs};

    return request({data, url: this.url, success: this.unload.bind(this)});
  },
};

BulkTaskStore.subscribe(() => {
  TaskStore.unload();
  appStore.dispatch(fetchTasks());
});
export default BulkTaskStore;
