import createBasicReducer from 'src/_common/create_basic_reducer';

import {INIT, UPDATE} from 'src/user/action_creators';

export default createBasicReducer({
  [INIT]() {
    return {};
  },

  [UPDATE](previousState: State, payload: User) {
    return {...previousState, ...payload};
  },
});
