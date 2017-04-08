import request from 'src/_helpers/request';
import TaskStore from 'src/task/store';

const TagStore = {
  listeners: [],
  loaded: false,
  models: [],
  name: 'tag',
  url: '/tags',

  get(url) {
    return request({url, method: 'get', success() { /* do nothing */ }});
  },

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

  updateModels(data) {
    this.models = data[`${this.name}s`];
    this.loaded = true;
    this.notifyListeners();
  },

  getAll() {
    let promise;

    if (this.loaded) {
      const data = {};

      data[`${this.name}s`] = this.models;

      promise = new Promise(function resolveNow(resolve) { resolve(data); });
    } else {
      promise = request({
        method: 'get',
        url: this.url,
        success: this.updateModels.bind(this),
      });
    }

    return promise;
  },

  update(id, attrs) {
    const data = {};

    data[this.name] = attrs;

    return request({
      data,
      url: `${this.url}/${id}`,
      success: this.unload.bind(this),
    });
  },
};

TaskStore.subscribe(function triggerTagStoreChange() {
  TagStore.loaded = false;
  TagStore.notifyListeners();
});

export default TagStore;
