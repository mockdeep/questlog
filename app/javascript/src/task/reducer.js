import update from 'immutability-helper';
import {normalize, schema} from 'normalizr';

import createBasicReducer from 'src/_common/create_basic_reducer';

import {INIT, SET, SET_AJAX_STATE, UPDATE_META} from 'src/task/action_creators';

function estimateMinutes(task) {
  return Math.floor((task.estimateSeconds || 1800) / 60);
}

function processTask(task) {
  return {
    ...task,
    estimateMinutes: estimateMinutes(task),
    loadingState: 'ready',
  };
}

const taskSchema = new schema.Entity('tasks', {}, {processStrategy: processTask});
const taskListSchema = new schema.Array(taskSchema);

export default createBasicReducer({
  [INIT]() {
    return {
      orderedIds: [],
      byId: {},
      meta: {postponeSeconds: 300, newTask: {title: ''}},
    };
  },

  [SET](previousState, taskData) {
    const {entities, result} = normalize(taskData, taskListSchema);

    return {...previousState, byId: entities.tasks, orderedIds: result};
  },

  [SET_AJAX_STATE](previousState, ajaxState) {
    return {...previousState, ajaxState};
  },

  [UPDATE_META](previousState, meta) {
    return update(previousState, {meta: {$merge: meta}});
  },
});
