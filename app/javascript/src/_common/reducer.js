import createBasicReducer from 'src/_common/create_basic_reducer';
import {INIT, UPDATE} from 'src/_common/action_creators';

export default createBasicReducer({
  [INIT]() {
    return {};
  },

  [UPDATE](previousState, payload) {
    return {...previousState, ...payload};
  },
});
