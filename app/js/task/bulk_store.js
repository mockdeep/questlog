import request from 'js/_helpers/request';

import TaskStore from 'js/task/store';

const BulkTaskStore = {
  models: [],
  loaded: false,
  name: 'bulk_task',

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

  updateModels(data) {
    this.models = data[`${this.name}s`];
    this.loaded = true;
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

  update(attrs) {
    const data = {};

    data[this.name] = attrs;

    return request({data, url: this.url(), success: this.unload.bind(this)});
  },
};

BulkTaskStore.subscribe(function unloadTaskStore() { TaskStore.unload(); });
export default BulkTaskStore;
