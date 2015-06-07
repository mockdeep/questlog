'use strict';

var request = require('../helpers').request;

module.exports = {
  url: 'tasks',

  destroy: function (id) {
    return request({
      url: this.url + '/' + id,
      method: 'delete',
      success: function () { /* do nothing */ }
    });
  }

};
