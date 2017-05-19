import {createSelector} from 'reselect';

const getOrderedTags = createSelector(
  (state) => state.tag,
  (tagState) => tagState.orderedIds.map((tagId) => tagState.byId[tagId])
);

const getActiveTags = createSelector(
  getOrderedTags,
  (orderedTags) => orderedTags.filter((tag) => tag.unfinishedTasksCount > 0)
);

const getSelectedTags = createSelector(
  getOrderedTags,
  (orderedTags) => orderedTags.filter((tag) => tag.isSelected)
);

export {getActiveTags, getSelectedTags};
