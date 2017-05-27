import update from 'immutability-helper';
import {normalize, schema} from 'normalizr';

import createBasicReducer from 'src/_common/create_basic_reducer';

const tagSchema = new schema.Entity('tags');
const tagListSchema = new schema.Array(tagSchema);

import {INIT, SET, UPDATE} from 'src/tag/action_creators';

export default createBasicReducer({
  [INIT]() {
    return {orderedIds: [], byId: {}};
  },

  [SET](previousState, tags) {
    const {entities, result} = normalize(tags, tagListSchema);

    return {...previousState, byId: entities.tags, orderedIds: result};
  },

  [UPDATE](previousState, tagAttrs) {
    if (!previousState.byId[tagAttrs.id]) {
      throw new Error(`no tag found for id ${tagAttrs.id}`);
    }

    return update(previousState, {byId: {[tagAttrs.id]: {$merge: tagAttrs}}});
  },
});
