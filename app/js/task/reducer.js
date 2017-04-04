import {normalize, schema} from 'normalizr';

import createBasicReducer from 'js/_common/basic_reducer';

const taskSchema = new schema.Entity('tasks');
const taskListSchema = new schema.Array(taskSchema);

function estimateMinutes(task) {
  return Math.floor((task.estimateSeconds || 1800) / 60);
}

function initStore() {
  return {newTask: {title: ''}};
}

function setAjaxState(previousState, ajaxState) {
  return {...previousState, ajaxState};
}

function setNewTask(previousState, newTask) {
  return {...previousState, newTask};
}

function setTasks(previousState, taskData) {
  const newTasks = taskData.map((task) => ({...task, estimateMinutes: estimateMinutes(task)}));

  return {...previousState, ...normalize(newTasks, taskListSchema)};
}

const operations = {
  'task/INIT': initStore,
  'task/SET': setTasks,
  'task/SET_NEW': setNewTask,
  'task/SET_AJAX_STATE': setAjaxState,
};

export default createBasicReducer(operations);
