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

const getOrderedTasks = createSelector(
  (state) => state.task.byId,
  (tasksById) => _.sortBy(tasksById, [timeframePosition, 'priority', 'position'])
);

const getPartitionedTasks = createSelector(
  getOrderedTasks,
  (orderedTasks) => {
    // note to self, I think we may need to cast `task.releaseAt` to boolean
    const [pending, undone] = _.partition(orderedTasks, (task) => task.releaseAt);

    return {pending, undone};
  }
);
const getNextUndoneTask = createSelector(
  [getPartitionedTasks, getSelectedTags],
  (partitionedTasks, selectedTags) => {
    const tagIds = selectedTags.map((tag) => tag.id);

    return partitionedTasks.undone.find((task) => hasTags(task, tagIds));
  }
);

export {getNextUndoneTask};
