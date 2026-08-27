import {groupBy, pickBy, sortBy} from "lodash";
import {createSelector} from "reselect";

import {grab} from "helpers/grab";

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
  return {pending: [], active: [], ...groupBy(tasks, "status")};
}

function processTasks(tasksById: TasksById): TasksById {
  return pickBy(tasksById, (task: Task) => task.status !== "done");
}

function mapTasksToParentId(tasksById: TasksById): TasksByParentId {
  const tasks = Object.values(tasksById);
  return tasks.reduce((result: TasksByParentId, task: Task) => {
    result[task.id] ??= [];
    if (task.parentTaskId) {
      result[task.parentTaskId] ||= [];
      grab(result, task.parentTaskId).push(task);
    }
    return result;
  }, {});
}

function grabLeafTasks(
  orderedTasks: Task[],
  tasksByParentId: TasksByParentId,
): Task[] {
  return orderedTasks.filter(task => {
    return grab(tasksByParentId, task.id).length === 0;
  });
}

const getTasksById = createSelector(
  (state: State) => state.task.byId,
  processTasks,
);

const getTasksByParentId = createSelector(getTasksById, mapTasksToParentId);

const getOrderedTasks = createSelector(
  getTasksById,
  tasksById => sortBy(tasksById, [timeframePosition, "priority", "position"]),
);

const getLeafTasks = createSelector(
  [getOrderedTasks, getTasksByParentId],
  grabLeafTasks,
);

const getPartitionedLeafTasks = createSelector(getLeafTasks, partitionTasks);

const getActiveTasks = createSelector(
  getPartitionedLeafTasks,
  partitionedTasks => partitionedTasks.active,
);

export {getActiveTasks};
