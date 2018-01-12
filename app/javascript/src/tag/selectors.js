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

function minPriority(tasks) {
  const priorities = tasks.map(task => task.priority).
    filter(priority => priority !== null);

  return priorities.length > 0 ? Math.min(...priorities) : null;
}

function processTags(tagsById, undoneTasks) {
  return mapValues(tagsById, tag => {
    const tasks = matchingTasks(tag, undoneTasks);

    return {...tag, tasks, priority: minPriority(tasks)};
  });
}

const getSelectedTagSlug = createSelector(
  state => state.route.params.slug,
  slug => slug || ''
);

const getTagsById = createSelector(
  [state => state.tag.byId, getUndoneTasks],
  processTags
);

const getOrderedTags = createSelector(
  getTagsById,
  tagsById => sortBy(Object.values(tagsById), 'name')
);

const getActiveTags = createSelector(
  [getOrderedTags],
  orderedTags => orderedTags.filter(tag => tag.tasks.length > 0)
);

const getSelectedTag = createSelector(
  [getOrderedTags, getSelectedTagSlug],
  (orderedTags, slug) => orderedTags.find(tag => tag.slug === slug)
);

const getNextUndoneTask = createSelector(
  [getSelectedTag], selectedTag => selectedTag.tasks[0]
);

export {
  getActiveTags,
  getNextUndoneTask,
  getOrderedTags,
  getSelectedTag,
};
