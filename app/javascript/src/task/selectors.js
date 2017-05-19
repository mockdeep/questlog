import _ from 'lodash';
import {createSelector} from 'reselect';

import {getSelectedTags} from 'src/tag/selectors';

const timeframePositions = {
  today: 1,
  week: 2,
  month: 3,
  quarter: 4,
  year: 5,
  lustrum: 6,
  decade: 7,
  century: 8,
};

function timeframePosition(task) {
  const {timeframe} = task;

  if (timeframe === null) { return 9; }

  const position = timeframePositions[timeframe];

  if (!position) { throw new Error(`invalid timeframe: ${timeframe}`); }

  return position;
}

function hasTags(task, tagIds) {
  return _.difference(tagIds, task.tagIds).length === 0;
}

function taskStatus(task) {
  return task.releaseAt ? 'pending' : 'undone';
}

const getOrderedTasks = createSelector(
  (state) => state.task.byId,
  (tasksById) => _.sortBy(tasksById, [timeframePosition, 'priority', 'position'])
);

const getPartitionedTasks = createSelector(
  getOrderedTasks,
  (orderedTasks) => _.groupBy(orderedTasks, taskStatus)
);

const getUndoneTasks = createSelector(
  getPartitionedTasks,
  (partitionedTasks) => partitionedTasks.undone
);

const getNextUndoneTask = createSelector(
  [getUndoneTasks, getSelectedTags],
  (undoneTasks, selectedTags) => {
    const tagIds = selectedTags.map((tag) => tag.id);

    return undoneTasks.find((task) => hasTags(task, tagIds));
  }
);

export {getNextUndoneTask};
