'use strict';

var extend = require('lodash').extend;

var RestfulStore = require('stores/restful_store');
var Task = require('records/task');

module.exports = extend({}, RestfulStore, {
  name: 'task',

  updateModels: function (data) {
    data.tasks = data.tasks.map(function (task_data) {
      return new Task(task_data);
    });
    RestfulStore.updateModels.call(this, data);
  }
});
