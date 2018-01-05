import {createSelector} from 'reselect';
import {mapValues, sortBy} from 'lodash';

import grab from 'src/_helpers/grab';
import {getUndoneTasks} from 'src/task/selectors';

const RULES = {
  isActive() { return true; },
  isAssociated(task, tag) { return task.tagIds.includes(tag.id); },
  isBlank(task, tag, {field}) { return task[field] === null; },
  isEmpty(task, tag, {field}) { return task[field].length === 0; },
};

function matchesSmartRules(task, tag) {
  const rules = [{check: 'isAssociated'}, ...tag.rules];

  return rules.some(({check, ...params}) => grab(RULES, check)(task, tag, params));
}

function matchingTasks(tag, tasks) {
  return tasks.filter(task => matchesSmartRules(task, tag));
}

const getSelectedTagSlug = createSelector(
  state => state.route.params.slug,
  slug => slug || ''
);

const getOrderedTags = createSelector(
  state => state.tag,
  tagState => sortBy(Object.values(tagState.byId), 'name')
);

const getTasksByTagId = createSelector(
  [state => state.tag.byId, getUndoneTasks],
  (tagsById, undoneTasks) => mapValues(tagsById, tag => matchingTasks(tag, undoneTasks))
);

const getActiveTags = createSelector(
  [getTasksByTagId, getOrderedTags],
  (tasksByTagId, orderedTags) => orderedTags.filter(tag => tasksByTagId[tag.id].length > 0)
);

const getSelectedTag = createSelector(
  [getOrderedTags, getSelectedTagSlug],
  (orderedTags, slug) => orderedTags.find(tag => tag.slug === slug)
);

const getNextUndoneTask = createSelector(
  [getUndoneTasks, getSelectedTag],
  (undoneTasks, selectedTag) => undoneTasks.find(task => matchesSmartRules(task, selectedTag))
);

export {getActiveTags, getNextUndoneTask, getOrderedTags, getSelectedTag};
