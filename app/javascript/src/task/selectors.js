import _ from 'lodash';
import {createSelector} from 'reselect';

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

function isChildTask(task) {
  return task.subTasks.length === 0;
}

function timeframePosition(task) {
  const {timeframe} = task;

  if (timeframe === null) { return 9; }

  const position = timeframePositions[timeframe];

  if (!position) { throw new Error(`invalid timeframe: ${timeframe}`); }

  return position;
}

const getOrderedTasks = createSelector(
  (state) => state.task.byId,
  (tasksById) => _.sortBy(tasksById, [timeframePosition, 'priority', 'position'])
);

const getPartitionedTasks = createSelector(
  getOrderedTasks,
  (orderedTasks) => {
    const [pending, undone] = _.partition(orderedTasks, (task) => task.releaseAt);

    return {pending, undone};
  }
);

const getUndoneTasks = createSelector(
  getPartitionedTasks,
  (partitionedTasks) => partitionedTasks.undone.filter(isChildTask)
);

const getCurrentTask = createSelector(
  (state) => state.task.byId[state.route.params.taskId],
  (task) => task
);

export {getCurrentTask, getUndoneTasks};
