'use strict';

const extend = require('lodash').extend;

const RestfulStore = require('stores/restful_store');
const Task = require('records/task');

module.exports = extend({}, RestfulStore, {
  name: 'task',

  updateModels(data) {
    data.tasks = data.tasks.map(function buildTask(taskData) {
      return new Task(taskData);
    });
    RestfulStore.updateModels.call(this, data);
  }
});
