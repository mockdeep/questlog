import flash from 'js/_helpers/flash';
import request from 'js/_helpers/request';
import TaskStore from 'js/task/store';

function setNewTask(payload) {
  return {type: 'task/SET_NEW', payload};
}

function setTaskAjaxState(payload) {
  return {type: 'task/SET_AJAX_STATE', payload};
}

function setTasks(payload) {
  return {type: 'task/SET', payload};
}

function fetchTasks() {
  return (dispatch) => {
    request({
      method: 'get',
      url: '/tasks',
      success: (data) => {
        dispatch(setTasks(data.tasks));
      },
    });
  };
}

function createTask(payload) {
  return (dispatch) => {
    dispatch(setTaskAjaxState('taskSaving'));

    request({
      data: {task: payload},
      url: '/tasks',
      method: 'post',
      success: () => {
        dispatch(setTaskAjaxState(null));
        dispatch(setNewTask({title: ''}));
        TaskStore.unload();
        flash('success', 'Task added');
      },
    });
  };
}

function deleteTask(taskId) {
  return () => {
    request({
      url: `tasks/${taskId}`,
      method: 'delete',
      success: () => { TaskStore.unload(); },
    });
  };
}

function updateTask(taskId, payload) {
  return () => {
    request({
      data: {task: payload},
      url: `tasks/${taskId}`,
      success: () => { TaskStore.unload(); },
    });
  };
}

export {createTask, deleteTask, fetchTasks, setNewTask, updateTask};
