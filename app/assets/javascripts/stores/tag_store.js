'use strict';

var request = require('../helpers').request;

module.exports = {
  url: '/tags',

  get: function (url) {
    return request({
      method: 'get',
      url: url,
      success: function () { /* do nothing */ }
    });
  }
};
