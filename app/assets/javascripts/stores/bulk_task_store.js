'use strict';

var _ = require('lodash');

var RestfulStore = require('./restful_store');

module.exports = _.extend({ name: 'bulk_task' }, RestfulStore);
