import {createSelector} from 'reselect';

function getTagsFromState(state) {
  return state.tag;
}

function isActive(tag) {
  return tag.unfinishedTasksCount > 0;
}

function activeTags(tags) {
  return tags.orderedIds.map((tagId) => tags.byId[tagId]).filter(isActive);
}

const getActiveTags = createSelector([getTagsFromState], activeTags);

export {getActiveTags};
