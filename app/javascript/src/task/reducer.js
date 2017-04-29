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
  return {orderedIds: [], byId: {}, newTask: {title: ''}};
}

function setAjaxState(previousState, ajaxState) {
  return {...previousState, ajaxState};
}

function setNewTask(previousState, newTask) {
  return {...previousState, newTask};
}

function setTasks(previousState, taskData) {
  const {entities, result} = normalize(taskData, taskListSchema);

  return {...previousState, byId: entities.tasks, orderedIds: result};
}

const operations = {
  'task/INIT': initStore,
  'task/SET': setTasks,
  'task/SET_NEW': setNewTask,
  'task/SET_AJAX_STATE': setAjaxState,
};

export default createBasicReducer(operations);
