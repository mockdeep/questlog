'use strict';

var _ = require('lodash');

var RestfulStore = require('./restful_store');
var TaskStore = require('./task_store');

var BulkTaskStore = _.extend({}, RestfulStore, { name: 'bulk_task' });

BulkTaskStore.on('change', function () { TaskStore.unload(); });
module.exports = BulkTaskStore;

