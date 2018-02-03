import {groupBy, pickBy, sortBy} from 'lodash';
import {createSelector} from 'reselect';

import grab from 'src/_helpers/grab';
import {getRouteParams} from 'src/route/selectors';

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

  return grab(timeframePositions, timeframe);
}

function partitionTasks(tasks) {
  return {pending: [], active: [], ...groupBy(tasks, 'status')};
}

function processTasks(tasksById) {
  return pickBy(tasksById, task => task.status !== 'done');
}

function mapTasksToParentId(tasksById) {
  return Object.values(tasksById).reduce((result, task) => {
    result[task.id] = result[task.id] || [];
    result[task.parentTaskId] = result[task.parentTaskId] || [];
    result[task.parentTaskId].push(task);
    return result;
  }, {});
}

function grabLeafTasks(orderedTasks, tasksByParentId) {
  return orderedTasks.filter(task => tasksByParentId[task.id].length === 0);
}

const getTasksById = createSelector(state => state.task.byId, processTasks);

const getTasksByParentId = createSelector(getTasksById, mapTasksToParentId);

const getOrderedTasks = createSelector(
  getTasksById,
  tasksById => sortBy(tasksById, [timeframePosition, 'priority', 'position'])
);

const getPartitionedTasks = createSelector(getOrderedTasks, partitionTasks);

const getLeafTasks = createSelector(
  [getOrderedTasks, getTasksByParentId],
  grabLeafTasks
);

const getRootTasks = createSelector(
  getOrderedTasks,
  orderedTasks => orderedTasks.filter(task => !task.parentTaskId)
);

const getPartitionedLeafTasks = createSelector(getLeafTasks, partitionTasks);

const getPartitionedRootTasks = createSelector(getRootTasks, partitionTasks);

const getActiveTasks = createSelector(
  getPartitionedLeafTasks,
  partitionedTasks => partitionedTasks.active
);

const getCurrentTask = createSelector(
  [getTasksById, getRouteParams],
  (tasksById, routeParams) => tasksById[routeParams.taskId]
);

const getCurrentSubTasks = createSelector(
  [getCurrentTask, getTasksByParentId],
  (currentTask, tasksByParentId) => tasksByParentId[currentTask.id]
);

export {
  getCurrentSubTasks,
  getCurrentTask,
  getPartitionedLeafTasks,
  getPartitionedRootTasks,
  getPartitionedTasks,
  getTasksByParentId,
  getActiveTasks,
};
