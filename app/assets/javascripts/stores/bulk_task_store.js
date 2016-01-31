'use strict';

var extend = require('lodash').extend;

var request = require('helpers').request;

var RestfulStore = require('stores/restful_store');
var TaskStore = require('stores/task_store');

var BulkTaskStore = extend({}, RestfulStore, {
  name: 'bulk_task',

  update: function (attrs) {
    var data = {};
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

