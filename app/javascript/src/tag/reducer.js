import update from 'immutability-helper';
import {keyBy} from 'lodash';

import createBasicReducer from 'src/_common/create_basic_reducer';

import {INIT, SET, UPDATE, UPDATE_META} from 'src/tag/action_creators';

export default createBasicReducer({
  [INIT]() {
    return {byId: {}, meta: {}};
  },

  [SET](previousState, tags) {
    return {...previousState, byId: keyBy(tags, 'id')};
  },

  [UPDATE](previousState, tagAttrs) {
    if (!previousState.byId[tagAttrs.id]) {
      throw new Error(`no tag found for id ${tagAttrs.id}`);
    }

    return update(previousState, {byId: {[tagAttrs.id]: {$merge: tagAttrs}}});
  },

  [UPDATE_META](previousState, meta) {
    return update(previousState, {meta: {$merge: meta}});
  },
});
