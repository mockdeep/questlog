import update from 'immutability-helper';
import {keyBy} from 'lodash';

import createBasicReducer from 'src/_common/create_basic_reducer';

import {INIT, SET, UPSERT} from 'src/tag/action_creators';

const operations = {
  [INIT]() {
    return {byId: {}, meta: {}};
  },

  [SET](previousState: TagState, tags: Tag[]) {
    return {...previousState, byId: keyBy(tags, 'id')};
  },

  [UPSERT](previousState: TagState, tag: Tag) {
    if (previousState.byId.hasOwnProperty(tag.id)) {
      return update(previousState, {byId: {[tag.id]: {$merge: tag}}});
    }

    return update(previousState, {byId: {$merge: {[tag.id]: tag}}});
  },
};

export default createBasicReducer<TagState, typeof operations>(operations);
