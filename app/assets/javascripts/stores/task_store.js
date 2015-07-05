'use strict';

var _ = require('lodash');

var RestfulStore = require('./restful_store');
var Task = require('../records/task');

module.exports = _.extend({}, RestfulStore, {
  name: 'task',

  updateModels: function (data) {
    data.tasks = data.tasks.map(function (task_data) {
      return new Task(task_data);
    });
    RestfulStore.updateModels.call(this, data);
  }
});
