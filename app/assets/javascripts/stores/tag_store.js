'use strict';

var extend = require('lodash').extend;

var request = require('helpers').request;
var RestfulStore = require('stores/restful_store');
var TaskStore = require('stores/task_store');

var TagStore = extend({}, RestfulStore, {
  name: 'tag',

  get: function (url) {
    return request({
      method: 'get',
      url: url,
      success: function () { /* do nothing */ }
    });
  }
});

TaskStore.on('change', function () { TagStore.loaded = false; TagStore.trigger('change'); });

module.exports = TagStore;
