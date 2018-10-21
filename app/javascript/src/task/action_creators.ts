import {Action} from 'redux';
import {ThunkAction} from 'redux-thunk';

import {ajaxGet, ajaxPut, ajaxPost, ajaxDelete} from 'src/_helpers/ajax';
import flash from 'src/_helpers/flash';
import TaskStore from 'src/task/store';
import {setTags, upsertTags} from 'src/tag/action_creators';

interface AsyncAction extends ThunkAction<void, State, null, Action> { }

const BASE_PATH = '/api/v1/tasks';

const INIT = 'task/INIT';
const CREATE = 'task/CREATE';
const DELETE = 'task/DELETE';
const SET = 'task/SET';
const UPDATE = 'task/UPDATE';
const UPDATE_META = 'task/UPDATE_META';

function createTaskPlain(payload: Task) {
  return {type: CREATE, payload};
}

function deleteTaskPlain(payload: number) {
  return {type: DELETE, payload};
}

function setTasks(payload: Task[]) {
  return {type: SET, payload};
}

function updateTaskMeta(payload: TaskMeta) {
  return {type: UPDATE_META, payload};
}

function fetchTasks(): AsyncAction {
  return async function fetchTasksThunk(dispatch) {
    dispatch(updateTaskMeta({ajaxState: 'fetching'}));
    const {data, included} = await ajaxGet(BASE_PATH);

    dispatch(setTasks(data));
    dispatch(setTags(included));
    dispatch(updateTaskMeta({ajaxState: 'ready'}));
  };
}

function createTask(payload: AjaxTask): AsyncAction {
  return async function createTaskThunk(dispatch) {
    dispatch(updateTaskMeta({ajaxState: 'taskSaving'}));

    const {data, included} = await ajaxPost(BASE_PATH, {task: payload});

    dispatch(updateTaskMeta({ajaxState: 'ready'}));
    dispatch(updateTaskMeta({newTask: {title: ''}}));
    dispatch(createTaskPlain(data));
    dispatch(upsertTags(included));
    TaskStore.unload();
    flash('success', 'Task added');
  };
}

function deleteTask(taskId: number): AsyncAction {
  return async function deleteTaskThunk(dispatch) {
    await ajaxDelete(`${BASE_PATH}/${taskId}`);

    dispatch(deleteTaskPlain(taskId));
    TaskStore.unload();
  };
}

function getLoadingState(payload: AjaxTask): TaskLoadingState {
  if (payload.done) {
    return 'marking_done';
  } else if (payload.postpone) {
    return 'postponing';
  }

  return 'updating';
}

function updateTaskPlain(id: number, payload: Partial<Task>) {
  return {type: UPDATE, payload: {id, ...payload}};
}

function updateTask(id: number, payload: AjaxTask): AsyncAction {
  return async function updateTaskThunk(dispatch) {
    const clientPayload = {loadingState: getLoadingState(payload)};

    dispatch(updateTaskPlain(id, clientPayload));

    const response = await ajaxPut(`${BASE_PATH}/${id}`, {task: payload});
    const {data, included} = response;

    dispatch(updateTaskPlain(id, data));
    dispatch(upsertTags(included));
    TaskStore.unload();
  };
}

export {INIT, CREATE, DELETE, SET, UPDATE, UPDATE_META};
export {
  createTask,
  deleteTask,
  fetchTasks,
  setTasks,
  updateTask,
  updateTaskMeta,
};
