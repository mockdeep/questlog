import {createSelector} from 'reselect';

import {getUndoneTasks} from 'src/task/selectors';

const RULES = {
  isAssociated(task, tag) { return task.tagIds.includes(tag.id); },
  isActive() { return true; },
};

function matchesSmartRules(task, tag) {
  const rules = [{check: 'isAssociated'}, ...tag.rules];

  return rules.some(({check, ...params}) => RULES[check](task, tag, params));
}

const getTagsById = createSelector(
  (state) => state.tag.byId,
  (tagsById) => tagsById
);

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
  (selectedTagId) => selectedTagId || 0
);

const getSelectedTag = createSelector(
  [getTagsById, getSelectedTagId],
  (tagsById, selectedTagId) => tagsById[selectedTagId]
);

const getNextUndoneTask = createSelector(
  [getUndoneTasks, getSelectedTag],
  (undoneTasks, selectedTag) => undoneTasks.find((task) => matchesSmartRules(task, selectedTag))
);

export {getActiveTags, getNextUndoneTask};
