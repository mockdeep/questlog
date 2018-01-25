import {at, groupBy, partition, sortBy} from 'lodash';
import {createSelector} from 'reselect';

import grab from 'src/_helpers/grab';
import {getRouteName, getRouteParams} from 'src/route/selectors';

function isActiveTask(task) {
  return Boolean(!task.doneAt || task.releaseAt);
}

function isLeafTask(task) {
  return task.subTaskIds.length === 0;
}

const TASK_FILTERS = {
  tasks() { return true; },
  leafTasks(task) { return isLeafTask(task); },
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

function timeframePosition(task) {
  const {timeframe} = task;

  if (timeframe === null) { return 9; }

  return grab(timeframePositions, timeframe);
}

function partitionTasks(tasks) {
  const [pending, undone] = partition(tasks, task => task.releaseAt);

  return {pending, undone};
}

function getSubTasks(task, tasksById) {
  return at(tasksById, task.subTaskIds);
}

function processTasks(tasksById) {
  const activeTasks = Object.values(tasksById).filter(isActiveTask);
  const tasksByParentId = groupBy(activeTasks, 'parentTaskId');

  return activeTasks.reduce((result, task) => {
    const subTasks = tasksByParentId[task.id] || [];
    const subTaskIds = subTasks.map(subTask => subTask.id);

    return {...result, [task.id]: {...task, subTaskIds}};
  }, {});
}

function filterTasksByRouteName(tasks, routeName) {
  return tasks.filter(grab(TASK_FILTERS, routeName));
}

const getTasksById = createSelector(state => state.task.byId, processTasks);

const getOrderedTasks = createSelector(
  getTasksById,
  tasksById => sortBy(tasksById, [timeframePosition, 'priority', 'position'])
);

const getPartitionedTasks = createSelector(getOrderedTasks, partitionTasks);

const getUndoneTasks = createSelector(
  getPartitionedTasks,
  partitionedTasks => partitionedTasks.undone.filter(isLeafTask)
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
  filterTasksByRouteName
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
