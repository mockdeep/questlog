import update from 'immutability-helper';

import createBasicReducer from 'src/_common/create_basic_reducer';

import {INIT, ADD, REMOVE, SET} from 'src/notification/action_creators';

type Payload = {
  key: NotificationKey;
  notification: Notification;
};

const operations = {
  [INIT]() {
    return {};
  },

  [ADD](previousState: NotificationState, payload: Payload) {
    return {...previousState, [payload.key]: payload.notification};
  },

  [REMOVE](previousState: NotificationState, payload: Payload) {
    return update(previousState, {$unset: [payload.key]});
  },

  [SET](previousState: NotificationState, payload: NotificationState) {
    return payload;
  },
};

export default
createBasicReducer<NotificationState, typeof operations>(operations);
