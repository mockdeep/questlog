const INIT = 'notification/INIT';
const ADD = 'notification/ADD';
const REMOVE = 'notification/REMOVE';

function addNotification(payload) {
  return {type: ADD, payload};
}

function removeNotification(payload) {
  return {type: REMOVE, payload};
}

export {INIT, ADD, REMOVE};
export {addNotification, removeNotification};
