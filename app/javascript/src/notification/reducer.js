import createBasicReducer from 'src/_common/create_basic_reducer';

import {INIT, ADD, REMOVE} from 'src/notification/action_creators';

export default createBasicReducer({
  [INIT]() {
    return {task: null};
  },

  [ADD](previousState, payload) {
    return {...previousState, [payload.key]: payload.notification};
  },

  [REMOVE](previousState, payload) {
    const notification = previousState[payload.key];

    if (notification) { notification.close(); }

    return {...previousState, [payload.key]: null};
  },
});
