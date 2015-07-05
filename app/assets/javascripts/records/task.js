'use strict';

var Record = require('immutable').Record;

module.exports = new Record({
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
