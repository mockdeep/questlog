import update from 'immutability-helper';
import {normalize, schema} from 'normalizr';

import createBasicReducer from 'src/_common/basic_reducer';

function estimateMinutes(task) {
  return Math.floor((task.estimateSeconds || 1800) / 60);
}

function processTask(task) {
  return {...task, estimateMinutes: estimateMinutes(task)};
}

const taskSchema = new schema.Entity('tasks', {}, {processStrategy: processTask});
const taskListSchema = new schema.Array(taskSchema);

function initStore() {
  return {
    orderedIds: [],
    byId: {},
    meta: {postponeSeconds: 300, newTask: {title: ''}},
  };
}

function setAjaxState(previousState, ajaxState) {
  return {...previousState, ajaxState};
}

function setTasks(previousState, taskData) {
  const {entities, result} = normalize(taskData, taskListSchema);

  return {...previousState, byId: entities.tasks, orderedIds: result};
}

function updateTaskMeta(previousState, meta) {
  return update(previousState, {meta: {$merge: meta}});
}

const operations = {
  'task/INIT': initStore,
  'task/SET': setTasks,
  'task/SET_AJAX_STATE': setAjaxState,
  'task/UPDATE_META': updateTaskMeta,
};

export default createBasicReducer(operations);
