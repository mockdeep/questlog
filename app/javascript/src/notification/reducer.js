import createBasicReducer from 'src/_common/create_basic_reducer';

import {INIT, ADD, REMOVE} from 'src/notification/action_creators';

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
