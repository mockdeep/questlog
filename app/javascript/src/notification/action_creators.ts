import {Action} from 'redux';
import {ThunkAction} from 'redux-thunk';

const INIT = 'notification/INIT';
const ADD = 'notification/ADD';
const REMOVE = 'notification/REMOVE';
const SET = 'notification/SET';

interface AsyncAction extends ThunkAction<void, State, null, Action> { }

type NotificationClickCallback = (event: Event) => any;
export type Payload = {
  key: NotificationKey;
  message: string;
  onClick: NotificationClickCallback;
};

function addNotificationPlain(payload: AppNotification) {
  return {type: ADD, payload};
}

function removeNotificationPlain(payload: {key: NotificationKey}) {
  return {type: REMOVE, payload};
}

function addNotification({key, message, onClick}: Payload): AsyncAction {
  return async function addNotificationThunk(dispatch) {
    const permission = await Notification.requestPermission();

    if (permission !== 'granted') { return; }

    const notification = new Notification(message);

    notification.onclick = onClick;

    dispatch(addNotificationPlain({key, notification}));
  };
}

function removeNotification(payload: {key: NotificationKey}): AsyncAction {
  return function removeNotificationThunk(dispatch, getState) {
    const notification = getState().notification[payload.key];

    if (notification) { notification.close(); }

    dispatch(removeNotificationPlain(payload));
  };
}

export {INIT, ADD, REMOVE, SET};
export {addNotification, removeNotification};
