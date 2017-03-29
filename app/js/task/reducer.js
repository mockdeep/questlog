import createBasicReducer from 'js/_common/basic_reducer';

function initStore() {
  return {newTask: {title: ''}};
}

function setNewTask(previousState, newTask) {
  return {...previousState, newTask};
}

const operations = {
  'task/INIT': initStore,
  'task/SET_NEW': setNewTask,
};

export default createBasicReducer(operations);
