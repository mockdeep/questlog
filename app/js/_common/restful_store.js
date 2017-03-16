import request from 'js/_helpers/request';

export default {
  models: [],
  loaded: false,

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

  getAll() {
    let promise;

    if (this.loaded) {
      const data = {};

      data[`${this.name}s`] = this.models;

      promise = new Promise(function resolveNow(resolve) { resolve(data); });
    } else {
      promise = request({
        method: 'get',
        url: this.url(),
        success: this.updateModels.bind(this),
      });
    }

    return promise;
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
};
