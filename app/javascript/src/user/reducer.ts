import createBasicReducer from 'src/_common/create_basic_reducer';

import {INIT, SET, UPDATE} from 'src/user/action_creators';

const operations = {
  [INIT]() {
    return {};
  },

  [SET](previousState: State, payload: User) {
    return payload;
  },

  [UPDATE](previousState: State, payload: User) {
    return {...previousState, ...payload};
  },
};

export default createBasicReducer<UserState, typeof operations>(operations);
