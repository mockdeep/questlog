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

function nextUndoneTask(partitionedTasks, selectedTags) {
  const selectedTagIds = selectedTags.map((tag) => tag.id);

  return partitionedTasks.undone.find((task) => _.difference(selectedTagIds, task.tagIds).length === 0);
}

function orderTasks(state) {
  const allTasks = Object.values(state.tasks.byId);

  return _.sortBy(allTasks, [timeframePosition, 'priority', 'position']);
}

function partitionTasks(orderedTasks) {
  const [pending, undone] = _.partition(orderedTasks, (task) => task.releaseAt);

  return {pending, undone};
}

const getPartitionedTasks = createSelector([orderTasks], partitionTasks);
const getNextUndoneTask = createSelector(
  [getPartitionedTasks, getSelectedTags],
  nextUndoneTask
);

export {getNextUndoneTask};
