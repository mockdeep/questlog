import createBasicReducer from 'src/_common/basic_reducer';

function initState() {
  return {task: null};
}

function addNotification(previousState, payload) {
  return {...previousState, [payload.type]: payload.notification};
}

function removeNotification(previousState, payload) {
  const notification = previousState[payload.type];

  if (notification) { notification.close(); }

  return {...previousState, [payload.type]: null};
}

const operations = {
  'notification/INIT': initState,
  'notification/ADD': addNotification,
  'notification/REMOVE': removeNotification,
};

export default createBasicReducer(operations);
