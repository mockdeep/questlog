import {createSelector} from 'reselect';

function getTagsFromState(state) {
  return state.tag;
}

function isActive(tag) {
  return tag.unfinishedTasksCount > 0;
}

function orderTags(tags) {
  return tags.orderedIds.map((tagId) => tags.byId[tagId]);
}

function filterActiveTags(orderedTags) {
  return orderedTags.filter(isActive);
}

function filterSelectedTags(getOrderedTags) {
  return getOrderedTags.filter((tag) => tag.isSelected);
}

const getOrderedTags = createSelector([getTagsFromState], orderTags);
const getActiveTags = createSelector([getOrderedTags], filterActiveTags);
const getSelectedTags = createSelector([getOrderedTags], filterSelectedTags);

export {getActiveTags, getSelectedTags};
