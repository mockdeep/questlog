import {createSelector} from 'reselect';
import {mapValues, sortBy} from 'lodash';

import grab from 'src/_helpers/grab';
import {getActiveTasks} from 'src/task/selectors';

const RULES = {
  isActive() { return true; },
  isAssociated(task: Task, tag: Tag) { return task.tagIds.includes(tag.id); },
  isBlank(task: Task, tag: Tag, {field}: {field: keyof Task}) {
    return task[field] === null;
  },
  isEmpty(task: Task, tag: Tag, {field}: {field: keyof Task}) {
    const value = task[field];
    if (!Array.isArray(value)) {
      throw new Error(`task field ${field} must be array, but was ${value}.`);
    }

    return value.length === 0;
  },
};

function matchesSmartRules(task: Task, tag: Tag) {
  const rules = [{check: 'isAssociated'}, ...tag.rules];

  return rules.some(({check, ...params}) => {
    const rule = grab(RULES, check);

    return rule(task, tag, params);
  });
}

function matchingTasks(tag: Tag, tasks: Task[]) {
  return tasks.filter(task => matchesSmartRules(task, tag));
}

function minPriority(tasks: Task[]) {
  const priorities = tasks.map((task: Task) => task.priority).
    filter(priority => priority !== null);

  return priorities.length > 0 ? Math.min(...priorities) : null;
}

function processTags(tagsById: {[id: number]: Tag}, activeTasks: Task[]) {
  return mapValues(tagsById, tag => {
    const tasks = matchingTasks(tag, activeTasks);

    return {...tag, tasks, priority: minPriority(tasks)};
  });
}

const getSelectedTagSlug = createSelector(
  (state: State) => state.route.params.slug,
  slug => slug || '',
);

const getTagsById = createSelector(
  [(state: State) => state.tag.byId, getActiveTasks],
  processTags,
);

const getOrderedTags = createSelector(
  getTagsById,
  tagsById => sortBy(Object.values(tagsById), 'name'),
);

const getActiveTags = createSelector(
  [getOrderedTags],
  orderedTags => orderedTags.filter(tag => tag.tasks.length > 0),
);

const getSelectedTag = createSelector(
  [getOrderedTags, getSelectedTagSlug],
  (orderedTags, slug) => orderedTags.find(tag => tag.slug === slug),
);

const getNextActiveTask = createSelector(
  [getSelectedTag], (selectedTag: Tag) => selectedTag.tasks[0],
);

export {
  getActiveTags,
  getNextActiveTask,
  getOrderedTags,
  getSelectedTag,
};
