import {createSelector} from 'reselect';

function getTagsFromState(state) {
  return state.tag;
}

function orderTags(tags) {
  return tags.orderedIds.map((tagId) => tags.byId[tagId]);
}

const getOrderedTags = createSelector([getTagsFromState], orderTags);

export {getOrderedTags};
