'use strict';

var request = require('../helpers').request;

module.exports = {
  url: '/timeframes',

  getAll: function () {
    return request({
      method: 'get',
      url: this.url,
      success: function () { /* do nothing */ }
    });
  }
};
