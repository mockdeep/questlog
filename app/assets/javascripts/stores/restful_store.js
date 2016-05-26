'use strict';

const without = require('lodash').without;

const request = require('helpers').request;

module.exports = {
  models: [],
  loaded: false,

  on(event, callback) {
    this.callbacks = this.callbacks || {};
    this.callbacks[event] = this.callbacks[event] || [];
    this.callbacks[event].push(callback);
  },

  off(event, callback) {
    this.callbacks[event] = without(this.callbacks[event], callback);
  },

  trigger(event) {
    if (!this.callbacks || !this.callbacks[event]) { return; }
    this.callbacks[event].forEach(function triggerCallback(callback) {
      callback();
    });
  },

  url() {
    return `/${this.name}s`;
  },

  load() {
    request({
      method: 'get',
      url: this.url(),
      success: this.updateModels.bind(this)
    });
  },

  unload() {
    this.loaded = false;
    this.trigger('change');
  },

  updateModels(data) {
    this.models = data[`${this.name}s`];
    this.loaded = true;
    this.trigger('change');
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
        success: this.updateModels.bind(this)
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
      success: this.unload.bind(this)
    });
  },

  update(id, attrs) {
    const data = {};

    data[this.name] = attrs;

    return request({
      data,
      url: `${this.url()}/${id}`,
      success: this.unload.bind(this)
    });
  },

  destroy(id) {
    return request({
      url: `${this.url()}/${id}`,
      method: 'delete',
      success: this.unload.bind(this)
    });
  }
};
