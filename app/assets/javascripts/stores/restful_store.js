'use strict';

const without = require('lodash').without;

const request = require('helpers').request;

module.exports = {
  models: [],
  loaded: false,

  on: function (event, callback) {
    this.callbacks = this.callbacks || {};
    this.callbacks[event] = this.callbacks[event] || [];
    this.callbacks[event].push(callback);
  },

  off: function (event, callback) {
    this.callbacks[event] = without(this.callbacks[event], callback);
  },

  trigger: function (event) {
    if (!this.callbacks || !this.callbacks[event]) { return; }
    this.callbacks[event].forEach(function (callback) { callback(); });
  },

  url: function () {
    return `/${this.name}s`;
  },

  load: function () {
    request({
      method: 'get',
      url: this.url(),
      success: this.updateModels.bind(this)
    });
  },

  unload: function () {
    this.loaded = false;
    this.trigger('change');
  },

  updateModels: function (data) {
    this.models = data[`${this.name}s`];
    this.loaded = true;
    this.trigger('change');
  },

  getAll: function () {
    if (this.loaded) {
      const data = {};

      data[`${this.name}s`] = this.models;

      return new Promise(function (resolve) { resolve(data); });
    } else {
      return request({
        method: 'get',
        url: this.url(),
        success: this.updateModels.bind(this)
      });
    }
  },

  create: function (attrs) {
    const data = {};

    data[this.name] = attrs;

    return request({
      url: this.url(),
      method: 'post',
      data: data,
      success: this.unload.bind(this)
    });
  },

  update: function (id, attrs) {
    const data = {};

    data[this.name] = attrs;

    return request({
      url: `${this.url()}/${id}`,
      data: data,
      success: this.unload.bind(this)
    });
  },

  destroy: function (id) {
    return request({
      url: `${this.url()}/${id}`,
      method: 'delete',
      success: this.unload.bind(this)
    });
  }
};
