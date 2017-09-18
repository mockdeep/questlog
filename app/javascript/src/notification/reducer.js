import update from 'immutability-helper';

import createBasicReducer from 'src/_common/create_basic_reducer';

import {INIT, ADD, REMOVE} from 'src/notification/action_creators';

export default createBasicReducer({
  [INIT]() {
    return {};
  },

  [ADD](previousState, payload) {
    return {...previousState, [payload.key]: payload.notification};
  },

  [REMOVE](previousState, payload) {
    return update(previousState, {$unset: [payload.key]});
  },
});
