import request from 'src/_helpers/request';

import appStore from 'src/app_store';
import TaskStore from 'src/task/store';
import {fetchTasks} from 'src/task/action_creators';

const BulkTaskStore = {
  listeners: [],
  loaded: false,
  models: [],
  name: 'bulk_task',
  url: '/bulk_task',

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

  unload() {
    this.loaded = false;
    this.notifyListeners();
  },

  create(attrs) {
    const data = {};

    data[this.name] = attrs;

    return request({
      data,
      url: this.url,
      method: 'post',
      success: this.unload.bind(this),
    });
  },

  update(attrs) {
    const data = {};

    data[this.name] = attrs;

    return request({data, url: this.url, success: this.unload.bind(this)});
  },
};

BulkTaskStore.subscribe(() => {
  TaskStore.unload();
  appStore.dispatch(fetchTasks());
});
export default BulkTaskStore;
