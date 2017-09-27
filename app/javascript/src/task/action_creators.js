import {ajaxGet, ajaxPut, ajaxPost, ajaxDelete} from 'src/_helpers/ajax';
import flash from 'src/_helpers/flash';
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
  return function fetchTasksThunk(dispatch) {
    dispatch(updateTaskMeta({ajaxState: 'fetching'}));
    ajaxGet(BASE_PATH).
      then(({data, included}) => {
        dispatch(setTasks(data));
        dispatch(setTags(included));
        dispatch(updateTaskMeta({ajaxState: 'ready'}));
      });
  };
}

function createTask(payload) {
  return function createTaskThunk(dispatch) {
    dispatch(updateTaskMeta({ajaxState: 'taskSaving'}));

    ajaxPost(BASE_PATH, {task: payload}).
      then(() => {
        dispatch(updateTaskMeta({ajaxState: 'ready'}));
        dispatch(updateTaskMeta({newTask: {title: ''}}));
        dispatch(fetchTasks());
        TaskStore.unload();
        flash('success', 'Task added');
      });
  };
}

function deleteTask(taskId) {
  return function deleteTaskThunk(dispatch) {
    ajaxDelete(`${BASE_PATH}/${taskId}`).
      then(() => {
        dispatch(fetchTasks());
        TaskStore.unload();
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

function updateTaskPlain(id, payload) {
  return {type: UPDATE, payload: {id, ...payload}};
}

function updateTask(id, payload) {
  return function updateTaskThunk(dispatch) {
    const clientPayload = {loadingState: getLoadingState(payload)};

    dispatch(updateTaskPlain(id, clientPayload));
    ajaxPut(`${BASE_PATH}/${id}`, {task: payload}).
      then(() => {
        dispatch(fetchTasks());
        TaskStore.unload();
      });
  };
}

export {INIT, SET, UPDATE, UPDATE_META};
export {createTask, deleteTask, fetchTasks, updateTask, updateTaskMeta};
