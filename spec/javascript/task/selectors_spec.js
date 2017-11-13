import {getCurrentTask} from 'src/task/selectors';

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
