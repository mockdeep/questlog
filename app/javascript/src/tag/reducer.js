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

const operations = {
  'tag/INIT': initStore,
  'tag/SET': setTags,
};

export default createBasicReducer(operations);
