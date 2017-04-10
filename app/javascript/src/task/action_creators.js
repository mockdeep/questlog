import flash from 'src/_helpers/flash';
import request from 'src/_helpers/request';
import TaskStore from 'src/task/store';
import {fetchTags} from 'src/tag/action_creators';

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
        dispatch(fetchTags());
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
        dispatch(fetchTasks());
        TaskStore.unload();
        flash('success', 'Task added');
      },
    });
  };
}

function deleteTask(taskId) {
  return (dispatch) => {
    request({
      url: `tasks/${taskId}`,
      method: 'delete',
      success: () => {
        dispatch(fetchTasks());
        TaskStore.unload();
      },
    });
  };
}

function updateTask(taskId, payload) {
  return (dispatch) => {
    request({
      data: {task: payload},
      url: `tasks/${taskId}`,
      success: () => {
        dispatch(fetchTasks());
        TaskStore.unload();
      },
    });
  };
}

export {createTask, deleteTask, fetchTasks, setNewTask, updateTask};
