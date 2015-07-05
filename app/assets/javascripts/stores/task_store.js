'use strict';

var _ = require('lodash');

var RestfulStore = require('./restful_store');
var Task = require('../records/task');

module.exports = _.extend({}, RestfulStore, {
  name: 'task',

  updateModels: function (data) {
    data.tasks = data.tasks.map(function (task) {
      task.estimate_seconds = task.estimate_seconds || 1800;
      return new Task(task);
    });
    RestfulStore.updateModels.call(this, data);
  }
});
