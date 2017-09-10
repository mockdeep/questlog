const INIT = 'notification/INIT';
const ADD = 'notification/ADD';
const REMOVE = 'notification/REMOVE';

function addNotification({key, message, onClick}) {
  const notification = new Notification(message);

  notification.onclick = onClick;

  return {type: ADD, payload: {key, notification}};
}

function removeNotification(payload) {
  return function removeNotificationThunk(dispatch, getState) {
    const notification = getState().notification[payload.key];

    if (notification) { notification.close(); }

    dispatch({type: REMOVE, payload});
  };
}

export {INIT, ADD, REMOVE};
export {addNotification, removeNotification};
