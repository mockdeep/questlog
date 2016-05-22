'use strict';

const extend = require('lodash').extend;

const request = require('helpers').request;
const RestfulStore = require('stores/restful_store');
const TaskStore = require('stores/task_store');

const TagStore = extend({}, RestfulStore, {
  name: 'tag',

  get(url) {
    return request({url, method: 'get', success() { /* do nothing */ }});
  }
});

TaskStore.on('change', function () { TagStore.loaded = false; TagStore.trigger('change'); });

module.exports = TagStore;
