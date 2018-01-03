import _ from 'lodash';
import {createSelector} from 'reselect';

import grab from 'src/_helpers/grab';
import {getRouteName} from 'src/route/selectors';

const TASK_FILTERS = {
  tasks() { return true; },
  leafTasks(task) { return task.subTasks.length === 0; },
  rootTasks(task) { return !task.parentTaskId; },
};

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

  const position = grab(timeframePositions, timeframe);

  if (!position) { throw new Error(`invalid timeframe: ${timeframe}`); }

  return position;
}

function partitionTasks(tasks) {
  const [pending, undone] = _.partition(tasks, task => task.releaseAt);

  return {pending, undone};
}

const getOrderedTasks = createSelector(
  state => state.task.byId,
  tasksById => _.sortBy(tasksById, [timeframePosition, 'priority', 'position'])
);

const getPartitionedTasks = createSelector(getOrderedTasks, partitionTasks);

const getUndoneTasks = createSelector(
  getPartitionedTasks,
  partitionedTasks => partitionedTasks.undone.filter(isChildTask)
);

const getCurrentTask = createSelector(
  state => state.task.byId[state.route.params.taskId],
  task => task
);

const getOrderedTasksForRoute = createSelector(
  [getOrderedTasks, getRouteName],
  (orderedTasks, routeName) => orderedTasks.filter(grab(TASK_FILTERS, routeName))
);

const getPartitionedTasksForRoute = createSelector(
  getOrderedTasksForRoute,
  partitionTasks
);

export {
  getCurrentTask,
  getPartitionedTasksForRoute,
  getUndoneTasks,
};
