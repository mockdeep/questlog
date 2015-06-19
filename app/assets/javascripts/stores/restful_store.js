'use strict';

var _ = require('lodash');

var request = require('../helpers').request;
var nowThen = require('../util/now_then');

module.exports = {
  models: [],
  loaded: false,

  on: function (event, callback) {
    this.callbacks = this.callbacks || {};
    this.callbacks[event] = this.callbacks[event] || [];
    this.callbacks[event].push(callback);
  },

  off: function (event, callback) {
    this.callbacks[event] = _.without(this.callbacks[event], callback);
  },

  trigger: function (event) {
    if (!this.callbacks || !this.callbacks[event]) { return; }
    this.callbacks[event].map(function (callback) { callback(); });
  },

  url: function () {
    return '/' + this.name + 's';
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
    this.models = data[this.name + 's'];
    this.loaded = true;
    this.trigger('change');
  },

  getAll: function () {
    if (this.loaded) {
      return nowThen({data: this.models});
    } else {
      return request({
        method: 'get',
        url: this.url(),
        success: this.updateModels.bind(this)
      });
    }
  },

  create: function (attrs) {
    var data = {};
    data[this.name] = attrs;
    return request({
      url: this.url(),
      method: 'post',
      data: data,
      success: this.unload.bind(this)
    });
  },

  update: function (id, attrs) {
    var data = {};
    data[this.name] = attrs;
    return request({
      url: this.url() + '/' + id,
      data: data,
      success: this.unload.bind(this)
    });
  },

  destroy: function (id) {
    return request({
      url: this.url() + '/' + id,
      method: 'delete',
      success: this.unload.bind(this)
    });
  }
};
