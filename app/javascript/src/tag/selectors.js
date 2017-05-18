import {createSelector} from 'reselect';

function isActive(tag) {
  return tag.unfinishedTasksCount > 0;
}

function orderTags(tagState) {
  return tagState.orderedIds.map((tagId) => tagState.byId[tagId]);
}

function filterActiveTags(orderedTags) {
  return orderedTags.filter(isActive);
}

function filterSelectedTags(getOrderedTags) {
  return getOrderedTags.filter((tag) => tag.isSelected);
}

const getOrderedTags = createSelector((state) => state.tag, orderTags);
const getActiveTags = createSelector(getOrderedTags, filterActiveTags);
const getSelectedTags = createSelector(getOrderedTags, filterSelectedTags);

export {getActiveTags, getSelectedTags};
