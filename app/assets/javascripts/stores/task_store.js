'use strict';

var _ = require('lodash');

var RestfulStore = require('./restful_store');

module.exports = _.extend({}, RestfulStore, {
  name: 'task',

  updateModels: function (data) {
    _.each(data.tasks, function (task) {
      task.estimate_seconds = task.estimate_seconds || 1800;
    });
    RestfulStore.updateModels.call(this, data);
  }
});
