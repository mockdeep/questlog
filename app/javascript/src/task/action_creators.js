import flash from 'src/_helpers/flash';
import request from 'src/_helpers/request';
import TaskStore from 'src/task/store';
import {setTags} from 'src/tag/action_creators';

const INIT = 'task/INIT';
const SET = 'task/SET';
const UPDATE_META = 'task/UPDATE_META';

function setTasks(payload) {
  return {type: SET, payload};
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
  return {type: UPDATE_META, payload};
}

function createTask(payload) {
  return (dispatch) => {
    dispatch(updateTaskMeta({ajaxState: 'taskSaving'}));

    request({
      data: {task: payload},
      url: '/tasks',
      method: 'post',
      success: () => {
        dispatch(updateTaskMeta({ajaxState: null}));
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

export {INIT, SET, UPDATE_META};
export {createTask, deleteTask, fetchTasks, updateTask, updateTaskMeta};
