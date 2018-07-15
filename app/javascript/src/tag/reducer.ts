import update from 'immutability-helper';
import {keyBy} from 'lodash';

import createBasicReducer from 'src/_common/create_basic_reducer';

import {INIT, SET, UPDATE, UPDATE_META, UPSERT} from 'src/tag/action_creators';

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

  [UPSERT](previousState, tag) {
    if (previousState.byId.hasOwnProperty(tag.id)) {
      return update(previousState, {byId: {[tag.id]: {$merge: tag}}});
    }

    return update(previousState, {byId: {$merge: {[tag.id]: tag}}});
  },

  [UPDATE_META](previousState, meta) {
    return update(previousState, {meta: {$merge: meta}});
  },
});
