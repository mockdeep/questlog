import flash from 'src/_helpers/flash';
import request from 'src/_helpers/request';
import TaskStore from 'src/task/store';
import {setTags} from 'src/tag/action_creators';

const INIT = 'task/INIT';
const SET = 'task/SET';
const UPDATE = 'task/UPDATE';
const UPDATE_META = 'task/UPDATE_META';

// const CLIENT_ATTRS = new Set(['id', 'loadingState']);
// const SERVER_ATTRS = new Set([]);
// const ALL_ATTRS = new Set([...CLIENT_ATTRS, ...SERVER_ATTRS]);

// function partitionObj(sourceObj, evaluator) {
//   const yesObj = {};
//   const noObj = {};

//   for (const [key, value] of sourceObj) {
//     if evaluator(value) {
//       yesObj[key] = value;
//     } else {
//       noObj[key] = value;
//     }
//   }

//   return [yesObj, noObj];
// }

// function isClientAttr(key) {
//   return CLIENT_ATTRS.has(key);
// }

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

// function updateTask(taskId, payload) {
//   return (dispatch) => {
//     const [clientPayload, serverPayload] = partitionObj(payload, CLIENT_ATTRS);
//     if (_.some(clientPayload)) { dispatch(updateClientTask(clientPayload)); }
//     if (_.some(serverPayload)) { dispatch(updateServerTask(serverPayload)); }
//   };
// }
//
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
      url: `tasks/${id}`,
      success: () => {
        dispatch(fetchTasks());
        TaskStore.unload();
      },
    });
  };
}

export {INIT, SET, UPDATE, UPDATE_META};
export {createTask, deleteTask, fetchTasks, updateTask, updateTaskMeta};
