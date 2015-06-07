'use strict';

var request = require('../helpers').request;

module.exports = {
  url: '/tags',

  getAll: function () {
    return request({
      method: 'get',
      url: this.url,
      success: function () { /* do nothing */ }
    });
  },

  get: function (url) {
    return request({
      method: 'get',
      url: url,
      success: function () { /* do nothing */ }
    });
  }
};
