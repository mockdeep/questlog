'use strict';

var _ = require('lodash');

var request = require('../helpers').request;
var RestfulStore = require('./restful_store');
var TaskStore = require('./task_store');

var TagStore = _.extend({}, RestfulStore, {
  name: 'tag',

  get: function (url) {
    return request({
      method: 'get',
      url: url,
      success: function () { /* do nothing */ }
    });
  }
});

TaskStore.on('change', function () { TagStore.loaded = false; TagStore.trigger('change'); });

module.exports = TagStore;
