'use strict';

import {Record} from 'immutable';

const Task = new Record({
  id: null,
  estimateSeconds: null,
  pending: null,
  priority: null,
  repeatSeconds: null,
  releaseAt: null,
  timeframe: null,
  title: null,
  tagNames: null,
  skipCount: null,
});

Object.defineProperty(Task.prototype, 'estimateMinutes', {
  get() {
    return Math.floor((this.estimateSeconds || 1800) / 60);
  },
});

export default Task;
