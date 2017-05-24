import flash from 'src/_helpers/flash';
import request from 'src/_helpers/request';
import TaskStore from 'src/task/store';
import {setTags} from 'src/tag/action_creators';

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
      url: '/api/v1/tasks',
      success: ({data, included}) => {
        dispatch(setTasks(data));
        dispatch(setTags(included));
      },
    });
  };
}

function updateTaskMeta(payload) {
  return {type: 'task/UPDATE_META', payload};
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
        dispatch(updateTaskMeta({newTask: {title: ''}}));
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

export {
  createTask,
  deleteTask,
  fetchTasks,
  updateTask,
  updateTaskMeta,
};
