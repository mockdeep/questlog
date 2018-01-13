import {keyBy} from 'lodash';
import update from 'immutability-helper';

import createBasicReducer from 'src/_common/create_basic_reducer';
import {INIT, CREATE, SET, UPDATE, UPDATE_META} from 'src/task/action_creators';

function estimateMinutes(task) {
  return Math.floor((task.estimateSeconds || 1800) / 60);
}

function processTask(task) {
  const processedTask = {
    loadingState: 'ready',
    ...task,
    estimateMinutes: estimateMinutes(task),
  };

  return processedTask;
}

export default createBasicReducer({
  [INIT]() {
    return {
      byId: {},
      meta: {postponeSeconds: 300, newTask: {title: ''}, ajaxState: 'loading'},
    };
  },

  [CREATE](previousState, taskAttrs) {
    const task = processTask(taskAttrs);

    return update(previousState, {byId: {$merge: {[task.id]: task}}});
  },

  [SET](previousState, taskData) {
    const tasks = taskData.map(processTask);

    return {...previousState, byId: keyBy(tasks, 'id')};
  },

  [UPDATE](previousState, taskAttrs) {
    const task = processTask(taskAttrs);

    return update(previousState, {byId: {[task.id]: {$merge: task}}});
  },

  [UPDATE_META](previousState, meta) {
    return update(previousState, {meta: {$merge: meta}});
  },
});
