import {at, partition, sortBy} from 'lodash';
import {createSelector} from 'reselect';

import grab from 'src/_helpers/grab';
import {getRouteName, getRouteParams} from 'src/route/selectors';

const TASK_FILTERS = {
  tasks() { return true; },
  leafTasks(task) { return task.subTaskIds.length === 0; },
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
  return task.subTaskIds.length === 0;
}

function timeframePosition(task) {
  const {timeframe} = task;

  if (timeframe === null) { return 9; }

  const position = grab(timeframePositions, timeframe);

  if (!position) { throw new Error(`invalid timeframe: ${timeframe}`); }

  return position;
}

function partitionTasks(tasks) {
  const [pending, undone] = partition(tasks, task => task.releaseAt);

  return {pending, undone};
}

function getSubTasks(task, tasksById) {
  return at(tasksById, task.subTaskIds);
}

const getTasksById = createSelector(
  state => state.task.byId,
  tasksById => tasksById
);

const getOrderedTasks = createSelector(
  getTasksById,
  tasksById => sortBy(tasksById, [timeframePosition, 'priority', 'position'])
);

const getPartitionedTasks = createSelector(getOrderedTasks, partitionTasks);

const getUndoneTasks = createSelector(
  getPartitionedTasks,
  partitionedTasks => partitionedTasks.undone.filter(isChildTask)
);

const getCurrentTask = createSelector(
  [getTasksById, getRouteParams],
  (tasksById, routeParams) => tasksById[routeParams.taskId]
);

const getCurrentSubTasks = createSelector(
  [getCurrentTask, getTasksById],
  (currentTask, tasksById) => getSubTasks(currentTask, tasksById)
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
  getCurrentSubTasks,
  getCurrentTask,
  getPartitionedTasksForRoute,
  getUndoneTasks,
};
