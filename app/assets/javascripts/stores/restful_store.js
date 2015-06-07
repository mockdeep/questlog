'use strict';

var request = require('../helpers').request;

module.exports = {
  url: function () {
    return '/' + this.name + 's';
  },

  getAll: function () {
    return request({
      method: 'get',
      url: this.url(),
      success: function () { /* do nothing */ }
    });
  },

  create: function (attrs) {
    var data = {};
    data[this.name] = attrs;
    return request({
      url: this.url(),
      method: 'post',
      data: data,
      success: function () { /* do nothing */ }
    });
  },

  update: function (id, attrs) {
    var data = {};
    data[this.name] = attrs;
    return request({
      url: this.url() + '/' + id,
      data: data,
      success: function () { /* do nothing */ }
    });
  },

  destroy: function (id) {
    return request({
      url: this.url() + '/' + id,
      method: 'delete',
      success: function () { /* do nothing */ }
    });
  }
};
