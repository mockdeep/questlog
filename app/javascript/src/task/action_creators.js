import flash from 'src/_helpers/flash';
import request from 'src/_helpers/request';
import TaskStore from 'src/task/store';
import {setTags} from 'src/tag/action_creators';

const BASE_PATH = '/api/v1/tasks';

const INIT = 'task/INIT';
const SET = 'task/SET';
const UPDATE = 'task/UPDATE';
const UPDATE_META = 'task/UPDATE_META';

function setTasks(payload) {
  return {type: SET, payload};
}

function updateTaskMeta(payload) {
  return {type: UPDATE_META, payload};
}

function fetchTasks() {
  return (dispatch) => {
    dispatch(updateTaskMeta({ajaxState: 'fetching'}));
    request({
      method: 'get',
      url: BASE_PATH,
      success: ({data, included}) => {
        dispatch(setTasks(data));
        dispatch(setTags(included));
        dispatch(updateTaskMeta({ajaxState: 'ready'}));
      },
    });
  };
}

function createTask(payload) {
  return (dispatch) => {
    dispatch(updateTaskMeta({ajaxState: 'taskSaving'}));

    request({
      data: {task: payload},
      url: BASE_PATH,
      method: 'post',
      success: () => {
        dispatch(updateTaskMeta({ajaxState: 'ready'}));
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
      url: `${BASE_PATH}/${taskId}`,
      method: 'delete',
      success: () => {
        dispatch(fetchTasks());
        TaskStore.unload();
      },
    });
  };
}

function getLoadingState(payload) {
  if (payload.done) {
    return 'marking_done';
  } else if (payload.postpone) {
    return 'postponing';
  }

  return 'updating';
}

function updateTaskClient(id, payload) {
  return {type: UPDATE, payload: {id, ...payload}};
}

function updateTask(id, payload) {
  return (dispatch) => {
    const clientPayload = {loadingState: getLoadingState(payload)};

    dispatch(updateTaskClient(id, clientPayload));
    request({
      data: {task: payload},
      url: `${BASE_PATH}/${id}`,
      success: () => {
        dispatch(fetchTasks());
        TaskStore.unload();
      },
    });
  };
}

export {INIT, SET, UPDATE, UPDATE_META};
export {createTask, deleteTask, fetchTasks, updateTask, updateTaskMeta};
