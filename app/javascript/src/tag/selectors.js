import {createSelector} from 'reselect';

import {getUndoneTasks} from 'src/task/selectors';

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

const getNextUndoneTask = createSelector(
  [getUndoneTasks, getSelectedTagId],
  (undoneTasks, selectedTagId) => {
    if (selectedTagId) {
      return undoneTasks.find((task) => task.tagIds.includes(selectedTagId));
    }

    return undoneTasks[0];
  }
);

export {getActiveTags, getNextUndoneTask};
