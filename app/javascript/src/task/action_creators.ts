import {Action} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {InferThunkActionCreatorType} from 'react-redux';

import {ajaxGet, ajaxPut, ajaxDelete} from 'src/_helpers/ajax';
import TaskStore from 'src/task/store';
import {setTags, upsertTags} from 'src/tag/action_creators';

interface AsyncAction extends ThunkAction<void, State, null, Action> { }

const BASE_PATH = '/api/v1/tasks';

const INIT = 'task/INIT';
const DELETE = 'task/DELETE';
const SET = 'task/SET';
const UPDATE = 'task/UPDATE';
const UPDATE_META = 'task/UPDATE_META';

function deleteTaskPlain(payload: number) {
  return {type: DELETE, payload};
}

function setTasks(payload: Task[]) {
  return {type: SET, payload};
}

function updateTaskMeta(payload: Partial<TaskMeta>) {
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

function deleteTask(taskId: number): AsyncAction {
  return async function deleteTaskThunk(dispatch) {
    await ajaxDelete(`${BASE_PATH}/${taskId}`);

    dispatch(deleteTaskPlain(taskId));
    TaskStore.unload();
  };
}

function getLoadingState(payload: Partial<AjaxTask>): TaskLoadingState {
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

function updateTask(id: number, payload: Partial<AjaxTask>): AsyncAction {
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

export {INIT, DELETE, SET, UPDATE, UPDATE_META};
export {
  deleteTask,
  fetchTasks,
  setTasks,
  updateTask,
  updateTaskMeta,
};

export type UpdateTask = InferThunkActionCreatorType<typeof updateTask>;
