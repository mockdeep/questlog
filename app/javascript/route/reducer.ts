import createBasicReducer from "../_common/create_basic_reducer";
import {INIT, SET} from "./action_creators";

type Payload = {
  foo: string;
};

const operations = {
  [INIT]() {
    return {params: {}};
  },

  [SET](_previousState: RouteState | null, payload: Payload) {
    return payload;
  },
};

export default createBasicReducer<RouteState, typeof operations>(operations);
