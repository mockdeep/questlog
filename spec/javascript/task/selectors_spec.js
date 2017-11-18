import {getCurrentTask, getUndoneTasks} from 'src/task/selectors';

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
});
