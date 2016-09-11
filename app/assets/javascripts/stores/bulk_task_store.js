'use strict';

const extend = require('lodash').extend;

const request = require('_helpers/request');

const RestfulStore = require('stores/restful_store');
const TaskStore = require('stores/task_store');

const BulkTaskStore = extend({}, RestfulStore, {
  name: 'bulk_task',

  update(attrs) {
    const data = {};

    data[this.name] = attrs;

    return request({data, url: this.url(), success: this.unload.bind(this)});
  }
});

BulkTaskStore.on('change', function unloadTaskStore() { TaskStore.unload(); });
module.exports = BulkTaskStore;
