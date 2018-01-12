import {
  getCurrentTask,
  getPartitionedTasksForRoute,
  getUndoneTasks,
} from 'src/task/selectors';

import {makeState, makeTask} from '_test_helpers/factories';

describe('getCurrentTask', () => {
  it('returns the current task represented in the route', () => {
    const task = makeTask({title: 'foo task'});
    const state = makeState({route: {params: {taskId: task.id}}, task: [task]});

    expect(getCurrentTask(state)).toEqual(task);
  });

  it('returns no task when task in route is not present', () => {
    const task = makeTask({title: 'foo task'});
    const state = makeState({route: {params: {taskId: 0}}, task: [task]});

    expect(getCurrentTask(state)).toBeUndefined();
  });
});

describe('getUndoneTasks', () => {
  it('returns tasks', () => {
    const task1 = makeTask({title: 'some task'});
    const task2 = makeTask({title: 'some other task'});
    const state = makeState({task: [task1, task2]});

    expect(getUndoneTasks(state)).toEqual([task1, task2]);
  });

  it('does not return tasks with a release date', () => {
    const task1 = makeTask({title: 'some task', releaseAt: new Date()});
    const task2 = makeTask({title: 'some other task'});
    const state = makeState({task: [task1, task2]});

    expect(getUndoneTasks(state)).toEqual([task2]);
  });

  it('does not return tasks with a done date', () => {
    const task1 = makeTask({title: 'some task', doneAt: new Date()});
    const task2 = makeTask({title: 'some other task'});
    const state = makeState({task: [task1, task2]});

    expect(getUndoneTasks(state)).toEqual([task2]);
  });

  it('does not return tasks with sub tasks', () => {
    const task1 = makeTask({title: 'some task'});
    const task2 = makeTask({title: 'some other task'});
    const task3 = makeTask({title: 'some child task', parentTaskId: task2.id});
    const state = makeState({task: [task1, task2, task3]});

    expect(getUndoneTasks(state)).toEqual([task1, task3]);
  });

  it('raises an error when task has invalid timeframe', () => {
    const task = makeTask({title: 'a task', timeframe: 'yesterday'});
    const state = makeState({task: [task]});

    expect(() => getUndoneTasks(state)).toThrow(/has no key "yesterday"/);
  });
});

describe('getPartitionedTasksForRoute', () => {
  const parentTask = makeTask();
  const subTask = makeTask({parentTaskId: parentTask.id});
  const subSubTask = makeTask({parentTaskId: subTask.id});
  parentTask.subTaskIds = [subTask.id];
  subTask.subTaskIds = [subSubTask.id];
  const tasks = [parentTask, subTask, subSubTask];

  it('returns all tasks when route is "/tasks"', () => {
    const state = makeState({route: {name: 'tasks'}, task: tasks});
    const expected = {
      pending: [],
      undone: [parentTask, subTask, subSubTask],
    };

    expect(getPartitionedTasksForRoute(state)).toEqual(expected);
  });

  it('returns root tasks when route is "/tasks/root"', () => {
    const state = makeState({route: {name: 'rootTasks'}, task: tasks});
    const expected = {pending: [], undone: [parentTask]};

    expect(getPartitionedTasksForRoute(state)).toEqual(expected);
  });

  it('returns leaf tasks when route is "/tasks/leaf"', () => {
    const state = makeState({route: {name: 'leafTasks'}, task: tasks});
    const expected = {pending: [], undone: [subSubTask]};

    expect(getPartitionedTasksForRoute(state)).toEqual(expected);
  });
});
