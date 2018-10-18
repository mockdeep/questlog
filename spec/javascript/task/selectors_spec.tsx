import {
  getCurrentTask,
  getPartitionedLeafTasks,
  getPartitionedRootTasks,
  getPartitionedTasks,
  getActiveTasks,
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

describe('getActiveTasks', () => {
  it('returns tasks', () => {
    const task1 = makeTask({title: 'some task'});
    const task2 = makeTask({title: 'some other task'});
    const state = makeState({task: [task1, task2]});

    expect(getActiveTasks(state)).toEqual([task1, task2]);
  });

  it('does not return tasks with a "pending" status', () => {
    const task1 = makeTask({title: 'some task', status: 'pending'});
    const task2 = makeTask({title: 'some other task'});
    const state = makeState({task: [task1, task2]});

    expect(getActiveTasks(state)).toEqual([task2]);
  });

  it('does not return tasks with a "done" status', () => {
    const task1 = makeTask({title: 'some task', status: 'done'});
    const task2 = makeTask({title: 'some other task'});
    const state = makeState({task: [task1, task2]});

    expect(getActiveTasks(state)).toEqual([task2]);
  });

  it('does not return tasks with sub tasks', () => {
    const task1 = makeTask({title: 'some task'});
    const task2 = makeTask({title: 'some other task'});
    const task3 = makeTask({title: 'some child task', parentTaskId: task2.id});
    const state = makeState({task: [task1, task2, task3]});

    expect(getActiveTasks(state)).toEqual([task1, task3]);
  });

  it('raises an error when task has invalid timeframe', () => {
    const task = makeTask({title: 'a task', timeframe: 'yesterday'});
    const state = makeState({task: [task]});

    expect(() => getActiveTasks(state)).toThrow(/has no key "yesterday"/u);
  });
});

describe('getPartitionedLeafTasks', () => {
  it('returns leaf tasks partitioned on pending status', () => {
    const task1 = makeTask({status: 'pending'});
    const task2 = makeTask({});
    const task3 = makeTask({parentTaskId: task2.id});
    const task4 = makeTask({status: 'done'});

    const state = makeState({task: [task1, task2, task3, task4]});

    const expected = {active: [task3], pending: [task1]};
    expect(getPartitionedLeafTasks(state)).toEqual(expected);
  });
});

describe('getPartitionedRootTasks', () => {
  it('returns root tasks partitioned on pending status', () => {
    const task1 = makeTask({status: 'pending'});
    const task2 = makeTask({});
    const task3 = makeTask({parentTaskId: task2.id});
    const task4 = makeTask({status: 'done'});

    const state = makeState({task: [task1, task2, task3, task4]});

    const expected = {active: [task2], pending: [task1]};
    expect(getPartitionedRootTasks(state)).toEqual(expected);
  });
});

describe('getPartitionedTasks', () => {
  it('returns tasks partitioned on pending status', () => {
    const task1 = makeTask({status: 'pending'});
    const task2 = makeTask({});
    const task3 = makeTask({parentTaskId: task2.id});
    const task4 = makeTask({status: 'done'});

    const state = makeState({task: [task1, task2, task3, task4]});

    const expected = {active: [task2, task3], pending: [task1]};
    expect(getPartitionedTasks(state)).toEqual(expected);
  });
});
