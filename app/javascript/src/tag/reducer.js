import update from 'immutability-helper';
import {normalize, schema} from 'normalizr';

import createBasicReducer from 'src/_common/basic_reducer';

const tagSchema = new schema.Entity('tags');
const tagListSchema = new schema.Array(tagSchema);

function initStore() {
  return {orderedIds: [], byId: {}};
}

function setTags(previousState, tags) {
  const {entities, result} = normalize(tags, tagListSchema);

  return {...previousState, byId: entities.tags, orderedIds: result};
}

function updateTag(previousState, tagAttrs) {
  if (!previousState.byId[tagAttrs.id]) {
    throw new Error(`no tag found for id ${tagAttrs.id}`);
  }

  return update(previousState, {byId: {[tagAttrs.id]: {$merge: tagAttrs}}});
}

const operations = {
  'tag/INIT': initStore,
  'tag/SET': setTags,
  'tag/UPDATE': updateTag,
};

export default createBasicReducer(operations);
