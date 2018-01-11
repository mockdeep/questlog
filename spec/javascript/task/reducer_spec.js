import {INIT, SET, UPDATE, UPDATE_META} from 'src/task/action_creators';
import taskReducer from 'src/task/reducer';

describe(INIT, () => {
  it('sets up the basic structure for the store', () => {
    const expectedState = {
      byId: {},
      meta: {postponeSeconds: 300, newTask: {title: ''}, ajaxState: 'loading'},
    };

    expect(taskReducer(null, {type: INIT})).toEqual(expectedState);
  });
});

describe(SET, () => {
  it('replaces the existing tasks', () => {
    const previousState = {
      meta: 'foo',
      byId: {dont: 'care'},
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
    };

    expect(taskReducer(previousState, action)).toEqual(expectedState);
  });

  it('sets empty state when no tasks', () => {
    const previousState = {
      meta: 'foo',
      byId: {dont: 'care'},
    };
    const action = {type: SET, payload: []};
    const expectedState = {meta: 'foo', byId: {}};

    expect(taskReducer(previousState, action)).toEqual(expectedState);
  });

  it('sets estimateMinutes for subTasks', () => {
    const previousState = {byId: {}};
    const task1 = {id: 1, title: 'a task', parentTaskId: 5};
    const task2 = {id: 5, title: 'wat task'};
    const action = {type: SET, payload: [task1, task2]};

    const expectedTask1 = {
      ...task1,
      estimateMinutes: 30,
      loadingState: 'ready',
    };
    const expectedTask2 = {
      ...task2,
      estimateMinutes: 30,
      loadingState: 'ready',
    };
    const expectedState = {byId: {1: expectedTask1, 5: expectedTask2}};

    expect(taskReducer(previousState, action)).toEqual(expectedState);
  });
});

describe(UPDATE, () => {
  it('updates the task in the store', () => {
    const task = {id: 6, title: 'foo'};
    const previousState = {byId: {6: task}};
    const payload = {id: 6, title: 'bar', estimateSeconds: 60};
    const action = {type: UPDATE, payload};
    const expectedTask = {
      ...task,
      ...payload,
      estimateMinutes: 1,
      loadingState: 'ready',
    };
    const expectedState = {byId: {6: expectedTask}};

    expect(taskReducer(previousState, action)).toEqual(expectedState);
  });

  it('preserves the loading state passed through the task attributes', () => {
    const task = {id: 6, title: 'foo'};
    const previousState = {byId: {6: task}};
    const payload = {id: 6, loadingState: 'updating'};
    const action = {type: UPDATE, payload};
    const expectedTask = {
      ...task,
      estimateMinutes: 30,
      loadingState: 'updating',
    };
    const expectedState = {byId: {6: expectedTask}};

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
