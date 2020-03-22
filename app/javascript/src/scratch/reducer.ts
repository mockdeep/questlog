import update from 'immutability-helper';

import createBasicReducer from 'src/_common/create_basic_reducer';

import {INIT, CREATE, DELETE, SET, UPDATE} from 'src/scratch/action_creators';

const operations = {
  [INIT]() {
    return {};
  },

  [CREATE](previousState: ScratchState, key: string) {
    return {...previousState, [key]: {}};
  },

  [DELETE](previousState: ScratchState, key: string) {
    return update(previousState, {$unset: [key]});
  },

  [SET](previousState: ScratchState, payload: ScratchState) {
    return payload;
  },

  [UPDATE](previousState: ScratchState, {key, ...scratch}: {key: string}) {
    return update(previousState, {[key]: {$merge: scratch}});
  },
};

export default createBasicReducer<ScratchState, typeof operations>(operations);
