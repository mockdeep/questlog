import createBasicReducer from 'src/_common/create_basic_reducer';
import {INIT, SET} from 'src/route/action_creators';

type Payload = {
  foo: string;
};

export default createBasicReducer({
  [INIT]() {
    return {params: {}};
  },

  [SET](previousState: State, payload: Payload) {
    return payload;
  },
});
