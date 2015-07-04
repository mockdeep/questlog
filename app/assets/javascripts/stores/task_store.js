'use strict';

var _ = require('lodash');

var RestfulStore = require('./restful_store');
var TaskRecord = require('../records/task_record');

module.exports = _.extend({}, RestfulStore, {
  name: 'task',

  updateModels: function (data) {
    data.tasks = data.tasks.map(function (task) {
      task.estimate_seconds = task.estimate_seconds || 1800;
      return new TaskRecord(task);
    });
    RestfulStore.updateModels.call(this, data);
  }
});
