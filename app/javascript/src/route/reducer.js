import createBasicReducer from 'src/_common/create_basic_reducer';
import {INIT, SET} from 'src/route/action_creators';

export default createBasicReducer({
  [INIT]() {
    return {params: {}};
  },

  [SET](previousState, payload) {
    return payload;
  },
});
