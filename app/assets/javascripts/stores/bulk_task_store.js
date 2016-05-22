'use strict';

const extend = require('lodash').extend;

const request = require('helpers').request;

const RestfulStore = require('stores/restful_store');
const TaskStore = require('stores/task_store');

const BulkTaskStore = extend({}, RestfulStore, {
  name: 'bulk_task',

  update: function (attrs) {
    const data = {};

    data[this.name] = attrs;

    return request({
      url: this.url(),
      data: data,
      success: this.unload.bind(this)
    });
  }
});

BulkTaskStore.on('change', function () { TaskStore.unload(); });
module.exports = BulkTaskStore;

