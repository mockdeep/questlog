import {Record} from 'immutable';

const Task = new Record({
  id: null,
  estimateSeconds: null,
  estimateMinutes: null,
  pending: null,
  priority: null,
  repeatSeconds: null,
  releaseAt: null,
  timeframe: null,
  title: null,
  tagNames: null,
  skipCount: null,
});

export default Task;
