'use strict';

var request = require('../helpers').request;

module.exports = {
  getAll: function () {
    return request({
      method: 'get',
      url: this.url,
      success: function () { /* do nothing */ }
    });
  },

  create: function (attrs) {
    return request({
      url: this.url,
      method: 'post',
      data: {task: attrs},
      success: function () { /* do nothing */ }
    });
  },

  update: function (id, attrs) {
    return request({
      url: this.url + '/' + id,
      data: {task: attrs},
      success: function () { /* do nothing */ }
    });
  },

  destroy: function (id) {
    return request({
      url: this.url + '/' + id,
      method: 'delete',
      success: function () { /* do nothing */ }
    });
  }
};
