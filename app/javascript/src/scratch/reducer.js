import update from 'immutability-helper';

import createBasicReducer from 'src/_common/create_basic_reducer';

import {INIT, CREATE, DELETE, UPDATE} from 'src/scratch/action_creators';

export default createBasicReducer({
  [INIT]() {
    return {};
  },

  [CREATE](previousState, key) {
    if (Object.prototype.hasOwnProperty.call(previousState, key)) {
      throw new Error(`Scratch state already has key: "${key}"`);
    }

    return {...previousState, [key]: {}};
  },

  [DELETE](previousState, key) {
    if (!Object.prototype.hasOwnProperty.call(previousState, key)) {
      throw new Error(`Scratch has no such key to delete: "${key}"`);
    }

    return update(previousState, {$unset: [key]});
  },

  [UPDATE](previousState, {key, ...scratch}) {
    if (!Object.prototype.hasOwnProperty.call(previousState, key)) {
      throw new Error(`Scratch has no such key to update: "${key}"`);
    }

    return update(previousState, {[key]: {$merge: scratch}});
  },
});
