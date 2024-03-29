import {createSelector} from 'reselect';
import {mapValues, sortBy} from 'lodash';

import grab from 'src/_helpers/grab';
import {assert} from 'src/_helpers/assert';
import {getActiveTasks} from 'src/task/selectors';

const RULES = {
  isActive(): boolean { return true; },
  isAssociated(task: Task, tag: Tag): boolean {
    return task.tagIds.includes(tag.id);
  },
  isBlank(task: Task, tag: Tag, {field}: {field?: keyof Task}): boolean {
    return task[assert(field)] === null;
  },
  isEmpty(task: Task, tag: Tag, {field}: {field?: keyof Task}): boolean {
    const value = task[assert(field)];
    if (!Array.isArray(value)) {
      throw new Error(`task field ${field} must be array, but was ${value}.`);
    }

    return value.length === 0;
  },
};

function matchesSmartRules(task: Task, tag: Tag): boolean {
  const rules: TagRule[] = [{check: 'isAssociated'}, ...tag.rules];

  return rules.some(({check, ...params}: TagRule): boolean => {
    const rule = grab(RULES, check);

    return rule(task, tag, params);
  });
}

function matchingTasks(tag: Tag, tasks: Task[]) {
  return tasks.filter(task => matchesSmartRules(task, tag));
}

function minPriority(tasks: Task[]) {
  const priorities = tasks.map((task: Task) => task.priority).
    filter((priority): priority is number => typeof priority === 'number');

  return priorities.length > 0 ? Math.min(...priorities) : null;
}

function processTags(tagsById: {[id: number]: Tag}, activeTasks: Task[]) {
  return mapValues(tagsById, tag => {
    const tasks = matchingTasks(tag, activeTasks);

    return {...tag, tasks, priority: minPriority(tasks)};
  });
}

function getSelectedTagSlug(state: State) {
  return state.route.params.slug || '';
}

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
  [getSelectedTag], (selectedTag: Tag | undefined) => selectedTag?.tasks[0],
);

export {getActiveTags, getNextActiveTask, getSelectedTag};
