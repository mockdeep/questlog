import update from 'immutability-helper';
import {normalize, schema} from 'normalizr';

import createBasicReducer from 'src/_common/create_basic_reducer';

import {INIT, SET, UPDATE, UPDATE_META} from 'src/task/action_creators';

function estimateMinutes(task) {
  return Math.floor((task.estimateSeconds || 1800) / 60);
}

function processTask(task) {
  return {
    estimateMinutes: estimateMinutes(task),
    loadingState: 'ready',
    ...task,
  };
}

const taskSchema = new schema.Entity('tasks', {}, {processStrategy: processTask});
const taskListSchema = new schema.Array(taskSchema);

export default createBasicReducer({
  [INIT]() {
    return {
      orderedIds: [],
      byId: {},
      meta: {postponeSeconds: 300, newTask: {title: ''}, ajaxState: 'loading'},
    };
  },

  [SET](previousState, taskData) {
    const {entities, result} = normalize(taskData, taskListSchema);

    return {...previousState, byId: entities.tasks || {}, orderedIds: result};
  },

  [UPDATE](previousState, taskAttrs) {
    const task = normalize(taskAttrs, taskSchema).entities.tasks[taskAttrs.id];

    return update(previousState, {byId: {[task.id]: {$merge: task}}});
  },

  [UPDATE_META](previousState, meta) {
    return update(previousState, {meta: {$merge: meta}});
  },
});
