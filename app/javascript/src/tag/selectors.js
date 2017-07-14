import {createSelector} from 'reselect';

import {getUndoneTasks} from 'src/task/selectors';

const RULES = {
  isActive() { return true; },
  isAssociated(task, tag) { return task.tagIds.includes(tag.id); },
  isBlank(task, tag, {field}) { return task[field] === null; },
  isEmpty(task, tag, {field}) { return task[field].length === 0; },
};

function matchesSmartRules(task, tag) {
  const rules = [{check: 'isAssociated'}, ...tag.rules];

  return rules.some(({check, ...params}) => RULES[check](task, tag, params));
}

const getSelectedTagSlug = createSelector(
  (state) => state.route.params.slug,
  (slug) => slug || ''
);

const getOrderedTags = createSelector(
  (state) => state.tag,
  (tagState) => tagState.orderedIds.map((tagId) => tagState.byId[tagId])
);

const getActiveTags = createSelector(
  getOrderedTags,
  (orderedTags) => orderedTags.filter((tag) => tag.unfinishedTasksCount > 0)
);

const getSelectedTag = createSelector(
  [getOrderedTags, getSelectedTagSlug],
  (orderedTags, slug) => orderedTags.find((tag) => tag.slug === slug)
);

const getNextUndoneTask = createSelector(
  [getUndoneTasks, getSelectedTag],
  (undoneTasks, selectedTag) => undoneTasks.find((task) => matchesSmartRules(task, selectedTag))
);

export {getActiveTags, getNextUndoneTask, getOrderedTags, getSelectedTag};
