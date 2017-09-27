const INIT = 'notification/INIT';
const ADD = 'notification/ADD';
const REMOVE = 'notification/REMOVE';

function addNotificationPlain(payload) {
  return {type: ADD, payload};
}

function removeNotificationPlain(payload) {
  return {type: REMOVE, payload};
}

function addNotification({key, message, onClick}) {
  return function addNotificationThunk(dispatch) {
    const notification = new Notification(message);

    notification.onclick = onClick;

    dispatch(addNotificationPlain({key, notification}));
  };
}

function removeNotification(payload) {
  return function removeNotificationThunk(dispatch, getState) {
    const notification = getState().notification[payload.key];

    if (notification) { notification.close(); }

    dispatch(removeNotificationPlain(payload));
  };
}

export {INIT, ADD, REMOVE};
export {addNotification, removeNotification};
