import createBasicReducer from 'src/_common/create_basic_reducer';
import {INIT, UPDATE} from 'src/_common/action_creators';

type Payload = {
  foo: string;
};

export default createBasicReducer({
  [INIT]() {
    return {};
  },

  [UPDATE](previousState: State, payload: Payload) {
    return {...previousState, ...payload};
  },
});
