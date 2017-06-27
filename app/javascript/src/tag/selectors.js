import {createSelector} from 'reselect';

const getOrderedTags = createSelector(
  (state) => state.tag,
  (tagState) => tagState.orderedIds.map((tagId) => tagState.byId[tagId])
);

const getActiveTags = createSelector(
  getOrderedTags,
  (orderedTags) => orderedTags.filter((tag) => tag.unfinishedTasksCount > 0)
);

const getSelectedTagId = createSelector(
  (state) => state.tag.meta.selectedTagId,
  (selectedTagId) => selectedTagId
);

export {getActiveTags, getSelectedTagId};
