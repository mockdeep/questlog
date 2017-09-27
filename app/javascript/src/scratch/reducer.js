import update from 'immutability-helper';

import createBasicReducer from 'src/_common/create_basic_reducer';

import {INIT, CREATE, DELETE, UPDATE} from 'src/scratch/action_creators';

export default createBasicReducer({
  [INIT]() {
    return {};
  },

  [CREATE](previousState, key) {
    return {...previousState, [key]: {}};
  },

  [DELETE](previousState, key) {
    return update(previousState, {$unset: [key]});
  },

  [UPDATE](previousState, {key, ...scratch}) {
    return update(previousState, {[key]: {$merge: scratch}});
  },
});
