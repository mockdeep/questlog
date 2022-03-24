import {keyBy} from 'lodash';
import update from 'immutability-helper';

import createBasicReducer from 'src/_common/create_basic_reducer';
import {
  INIT,
  DELETE,
  SET,
  UPDATE,
  UPDATE_META,
} from 'src/task/action_creators';

function estimateMinutes(task: UnprocessedTask) {
  return Math.floor((task.estimateSeconds || 1800) / 60);
}

function processTask(task: UnprocessedTask): Task {
  const processedTask: Task = {
    loadingState: 'ready',
    ...task,
    estimateMinutes: estimateMinutes(task),
  };

  return processedTask;
}

const operations = {
  [INIT]() {
    return {
      byId: {},
      meta: {postponeSeconds: 300, ajaxState: 'loading'},
    };
  },

  [DELETE](previousState: TaskState, taskId: number) {
    return update(previousState, {byId: {$unset: [taskId]}});
  },

  [SET](previousState: TaskState, taskData: Task[]) {
    const tasks = taskData.map(processTask);

    return {...previousState, byId: keyBy(tasks, 'id')};
  },

  [UPDATE](previousState: TaskState, taskAttrs: Task) {
    const task =
      processTask({...previousState.byId[taskAttrs.id], ...taskAttrs});

    return update(previousState, {byId: {$merge: {[task.id]: task}}});
  },

  [UPDATE_META](previousState: TaskState, meta: TaskMeta) {
    return update(previousState, {meta: {$merge: meta}});
  },
};

export default createBasicReducer<TaskState, typeof operations>(operations);
