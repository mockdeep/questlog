'use strict';

var _ = require('lodash');
var request = require('../helpers').request;

var RestfulStore = require('./restful_store');
var TaskStore = require('./task_store');

var TimeframeStore = _.extend({}, RestfulStore, {
  name: 'timeframe',

  getAll: function () {
    return request({
      method: 'get',
      url: this.url(),
      success: function () { /* do nothing */ }
    });
  }
});

TaskStore.on('change', function () { TimeframeStore.unload(); });

module.exports = TimeframeStore;
