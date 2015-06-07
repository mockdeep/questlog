'use strict';

var _ = require('lodash');

var request = require('../helpers').request;
var RestfulStore = require('./restful_store');

module.exports = _.extend({
  url: '/tags',

  get: function (url) {
    return request({
      method: 'get',
      url: url,
      success: function () { /* do nothing */ }
    });
  }
}, RestfulStore);
