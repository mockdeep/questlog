import createBasicReducer from 'src/_common/basic_reducer';

const INIT = 'notification/INIT';
const ADD = 'notification/ADD';
const REMOVE = 'notification/REMOVE';

export default createBasicReducer({
  [INIT]() {
    return {task: null};
  },

  [ADD](previousState, payload) {
    return {...previousState, [payload.type]: payload.notification};
  },

  [REMOVE](previousState, payload) {
    const notification = previousState[payload.type];

    if (notification) { notification.close(); }

    return {...previousState, [payload.type]: null};
  },
});
