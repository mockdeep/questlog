/* eslint-disable camelcase */
/* need to change server calls to return camelcase */

'use strict';

const Record = require('immutable').Record;

const Task = new Record({
  id: null,
  estimate_seconds: null,
  pending: null,
  priority: null,
  repeat_seconds: null,
  release_at: null,
  timeframe: null,
  title: null,
  tag_names: null,
  skip_count: null
});

Object.defineProperty(Task.prototype, 'estimate_minutes', {
  get: function () {
    return Math.floor((this.estimate_seconds || 1800) / 60);
  }
});

module.exports = Task;
