import taskReducer from 'src/task/reducer';

describe('task/INIT', () => {
  it('sets up the basic structure for the store', () => {
    const expected = {
      byId: {},
      orderedIds: [],
      meta: {postponeSeconds: 300, newTask: {title: ''}},
    };

    expect(taskReducer(null, {type: 'task/INIT'})).toEqual(expected);
  });
});

describe('task/SET', () => {
  it('replaces the existing tasks', () => {
    const previousState = {
      meta: 'foo',
      byId: {dont: 'care'},
      orderedIds: [1, 2, 3],
    };
    const task1 = {id: 1, title: 'a task'};
    const task2 = {id: 5, title: 'wat task'};
    const action = {type: 'task/SET', payload: [task2, task1]};
    const expected = {
      meta: 'foo',
      byId: {
        1: {...task1, estimateMinutes: 30, loadingState: 'ready'},
        5: {...task2, estimateMinutes: 30, loadingState: 'ready'},
      },
      orderedIds: [5, 1],
    };

    expect(taskReducer(previousState, action)).toEqual(expected);
  });
});
