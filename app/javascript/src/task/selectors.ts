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

const nullTask = {
  tagNames: [],
} as const;

function timeframePosition(task: Task): number {
  const {timeframe} = task;

  if (timeframe === null) { return 9; }

  return grab(timeframePositions, timeframe);
}

type PartitionedTasks = {
  active: Task[];
  pending: Task[];
};

function partitionTasks(tasks: Task[]): PartitionedTasks {
  return {pending: [], active: [], ...groupBy(tasks, 'status')};
}

function processTasks(tasksById: TasksById): TasksById {
  return pickBy(tasksById, (task: Task) => task.status !== 'done');
}

function mapTasksToParentId(tasksById: TasksById): TasksByParentId {
  const tasks = Object.values(tasksById);
  return tasks.reduce((result: TasksByParentId, task: Task) => {
    result[task.id] = result[task.id] || [];
    if (task.parentTaskId) {
      result[task.parentTaskId] = result[task.parentTaskId] || [];
      result[task.parentTaskId].push(task);
    }
    return result;
  }, {});
}

function grabLeafTasks(
  orderedTasks: Task[],
  tasksByParentId: TasksByParentId,
): Task[] {
  return orderedTasks.filter(task => tasksByParentId[task.id].length === 0);
}

function grabCurrentTask(tasksById: TasksById, routeParams: RouteParams): Task {
  return tasksById[routeParams.taskId] || nullTask;
}

const getTasksById = createSelector(
  (state: State) => state.task.byId,
  processTasks,
);

const getTasksByParentId = createSelector(getTasksById, mapTasksToParentId);

const getOrderedTasks = createSelector(
  getTasksById,
  tasksById => sortBy(tasksById, [timeframePosition, 'priority', 'position']),
);

const getPartitionedTasks = createSelector(getOrderedTasks, partitionTasks);

const getLeafTasks = createSelector(
  [getOrderedTasks, getTasksByParentId],
  grabLeafTasks,
);

const getRootTasks = createSelector(
  getOrderedTasks,
  orderedTasks => orderedTasks.filter(task => !task.parentTaskId),
);

const getPartitionedLeafTasks = createSelector(getLeafTasks, partitionTasks);

const getPartitionedRootTasks = createSelector(getRootTasks, partitionTasks);

const getActiveTasks = createSelector(
  getPartitionedLeafTasks,
  partitionedTasks => partitionedTasks.active,
);

const getCurrentTask = createSelector(
  getTasksById,
  getRouteParams,
  grabCurrentTask,
);

const getCurrentSubTasks = createSelector(
  [getCurrentTask, getTasksByParentId],
  (currentTask: Task, tasksByParentId) => tasksByParentId[currentTask.id] || [],
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
