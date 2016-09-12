'use strict';

const extend = require('lodash').extend;

const RestfulStore = require('_common/restful_store');
const Task = require('task/model');

module.exports = extend({}, RestfulStore, {
  name: 'task',

  updateModels(data) {
    data.tasks = data.tasks.map(function buildTask(taskData) {
      return new Task(taskData);
    });
    RestfulStore.updateModels.call(this, data);
  }
});
