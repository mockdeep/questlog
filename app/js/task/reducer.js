import createBasicReducer from 'js/_common/basic_reducer';

function initStore() {
  return {newTask: {title: ''}};
}

function setAjaxState(previousState, ajaxState) {
  return {...previousState, ajaxState};
}

function setNewTask(previousState, newTask) {
  return {...previousState, newTask};
}

const operations = {
  'task/INIT': initStore,
  'task/SET_NEW': setNewTask,
  'task/SET_AJAX_STATE': setAjaxState,
};

export default createBasicReducer(operations);
