import update from 'immutability-helper';

import createBasicReducer from 'src/_common/create_basic_reducer';

import {INIT, ADD, REMOVE} from 'src/notification/action_creators';

type Payload = {
  key: string;
  notification: Notification;
};

export default createBasicReducer({
  [INIT]() {
    return {};
  },

  [ADD](previousState: NotificationState, payload: Payload) {
    return {...previousState, [payload.key]: payload.notification};
  },

  [REMOVE](previousState: NotificationState, payload: Payload) {
    return update(previousState, {$unset: [payload.key]});
  },
});
