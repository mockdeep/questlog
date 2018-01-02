import {
  getCurrentTask,
  getPartitionedTasksForRoute,
  getUndoneTasks,
} from 'src/task/selectors';

describe('getCurrentTask', () => {
  it('returns the current task represented in the route', () => {
    const task = {id: 53, title: 'foo task'};
    const state = {
      task: {byId: {53: task}},
      route: {params: {taskId: 53}},
    };

    expect(getCurrentTask(state)).toBe(task);
  });

  it('returns no task when task in route is not present', () => {
    const task = {id: 53, title: 'foo task'};
    const state = {
      task: {byId: {53: task}},
      route: {params: {taskId: 54}},
    };

    expect(getCurrentTask(state)).toBeUndefined();
  });
});

describe('getUndoneTasks', () => {
  it('returns tasks', () => {
    const task1 = {id: 53, title: 'some task', timeframe: null, subTasks: []};
    const task2 = {id: 54, title: 'some other task', timeframe: null, subTasks: []};

    const state = {task: {byId: {53: task1, 54: task2}}};

    expect(getUndoneTasks(state)).toEqual([task1, task2]);
  });

  it('does not return tasks with a release date', () => {
    const task1 = {
      id: 53,
      title: 'some task',
      timeframe: null,
      subTasks: [],
      releaseAt: new Date(),
    };
    const task2 = {id: 54, title: 'some other task', timeframe: null, subTasks: []};

    const state = {task: {byId: {53: task1, 54: task2}}};

    expect(getUndoneTasks(state)).toEqual([task2]);
  });

  it('does not return tasks with sub tasks', () => {
    const task1 = {id: 53, title: 'some task', timeframe: null, subTasks: []};
    const task2 = {
      id: 54,
      title: 'some other task',
      timeframe: null,
      subTasks: [{id: 55, title: 'who cares'}],
    };

    const state = {task: {byId: {53: task1, 54: task2}}};

    expect(getUndoneTasks(state)).toEqual([task1]);
  });

  it('raises an error when task has invalid timeframe', () => {
    const task = {id: 3, title: 'a task', timeframe: 'yesterday', subTasks: []};

    const state = {task: {byId: {3: task}}};

    expect(() => getUndoneTasks(state)).toThrow(/invalid timeframe/);
  });
});

describe('getPartitionedTasksForRoute', () => {
  const subSubTask = {id: 10, timeframe: null, parentTaskId: 5, subTasks: []};
  const subTask = {id: 5, timeframe: null, parentTaskId: 2, subTasks: [subSubTask]};
  const parentTask = {id: 2, timeframe: null, subTasks: [subTask]};
  const byId = {2: parentTask, 5: subTask, 10: subSubTask};

  it('returns all tasks when route is "/tasks"', () => {
    const state = {route: {name: 'tasks'}, task: {byId}};
    const expected = {
      pending: [],
      undone: [parentTask, subTask, subSubTask],
    };

    expect(getPartitionedTasksForRoute(state)).toEqual(expected);
  });

  it('returns root tasks when route is "/tasks/root"', () => {
    const state = {route: {name: 'rootTasks'}, task: {byId}};
    const expected = {pending: [], undone: [parentTask]};

    expect(getPartitionedTasksForRoute(state)).toEqual(expected);
  });

  it('returns leaf tasks when route is "/tasks/leaf"', () => {
    const state = {route: {name: 'leafTasks'}, task: {byId}};
    const expected = {pending: [], undone: [subSubTask]};

    expect(getPartitionedTasksForRoute(state)).toEqual(expected);
  });
});
