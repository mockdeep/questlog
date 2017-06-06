import {INIT, SET, UPDATE, UPDATE_META} from 'src/task/action_creators';
import taskReducer from 'src/task/reducer';

describe(INIT, () => {
  it('sets up the basic structure for the store', () => {
    const expectedState = {
      byId: {},
      orderedIds: [],
      meta: {postponeSeconds: 300, newTask: {title: ''}},
    };

    expect(taskReducer(null, {type: INIT})).toEqual(expectedState);
  });
});

describe(SET, () => {
  it('replaces the existing tasks', () => {
    const previousState = {
      meta: 'foo',
      byId: {dont: 'care'},
      orderedIds: [1, 2, 3],
    };
    const task1 = {id: 1, title: 'a task'};
    const task2 = {id: 5, title: 'wat task'};
    const action = {type: SET, payload: [task2, task1]};
    const expectedState = {
      meta: 'foo',
      byId: {
        1: {...task1, estimateMinutes: 30, loadingState: 'ready'},
        5: {...task2, estimateMinutes: 30, loadingState: 'ready'},
      },
      orderedIds: [5, 1],
    };

    expect(taskReducer(previousState, action)).toEqual(expectedState);
  });

  it('sets empty state when no tasks', () => {
    const previousState = {
      meta: 'foo',
      byId: {dont: 'care'},
      orderedIds: [1, 2, 3],
    };
    const action = {type: SET, payload: []};
    const expectedState = {meta: 'foo', byId: {}, orderedIds: []};

    expect(taskReducer(previousState, action)).toEqual(expectedState);
  });
});

describe(UPDATE, () => {
  it('updates the task in the store', () => {
    const task = {id: 6, title: 'foo'};
    const previousState = {
      byId: {6: task},
      orderedIds: [6],
    };
    const payload = {id: 6, title: 'bar', estimateSeconds: 60};
    const action = {type: UPDATE, payload};
    const expectedTask = {
      ...task,
      ...payload,
      estimateMinutes: 1,
      loadingState: 'ready',
    };
    const expectedState = {byId: {6: expectedTask}, orderedIds: [6]};

    expect(taskReducer(previousState, action)).toEqual(expectedState);
  });

  it('preserves the loading state passed through the task attributes', () => {
    const task = {id: 6, title: 'foo'};
    const previousState = {
      byId: {6: task},
      orderedIds: [6],
    };
    const payload = {id: 6, loadingState: 'updating'};
    const action = {type: UPDATE, payload};
    const expectedTask = {
      ...task,
      estimateMinutes: 30,
      loadingState: 'updating',
    };
    const expectedState = {byId: {6: expectedTask}, orderedIds: [6]};

    expect(taskReducer(previousState, action)).toEqual(expectedState);
  });
});

describe(UPDATE_META, () => {
  it('updates meta information in the state', () => {
    const previousState = {meta: {foo: 'bar', baz: 'butz'}};
    const action = {type: UPDATE_META, payload: {baz: 'bootz'}};
    const expectedState = {meta: {foo: 'bar', baz: 'bootz'}};

    expect(taskReducer(previousState, action)).toEqual(expectedState);
  });
});
