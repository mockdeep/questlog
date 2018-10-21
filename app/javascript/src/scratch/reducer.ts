import update from 'immutability-helper';

import createBasicReducer from 'src/_common/create_basic_reducer';

import {INIT, CREATE, DELETE, UPDATE} from 'src/scratch/action_creators';

export default createBasicReducer({
  [INIT]() {
    return {};
  },

  [CREATE](previousState: ScratchState, key: string) {
    return {...previousState, [key]: {}};
  },

  [DELETE](previousState: ScratchState, key: string) {
    return update(previousState, {$unset: [key]});
  },

  [UPDATE](previousState: ScratchState, {key, ...scratch}: {key: string}) {
    return update(previousState, {[key]: {$merge: scratch}});
  },
});
