'use strict';

var request = require('../helpers').request;

module.exports = {

  url: '/bulk_tasks',

  create: function (attrs) {
    return request({
      url: this.url,
      method: 'post',
      data: {bulk_task: attrs},
      success: function () { /* do nothing */ }
    });
  },

  update: function (attrs) {
    return request({
      url: this.url,
      data: {bulk_task: attrs},
      success: function () { /* do nothing */ }
    });
  }
};

