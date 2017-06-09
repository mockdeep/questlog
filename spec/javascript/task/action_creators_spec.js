jest.mock('src/_helpers/flash');
jest.mock('src/_helpers/request');
jest.mock('src/task/store');

import store from 'src/app_store';
import request from 'src/_helpers/request';
import TaskStore from 'src/task/store';
import {
  SET, UPDATE, UPDATE_META,
  createTask, fetchTasks, updateTask, updateTaskMeta,
} from 'src/task/action_creators';

const dispatch = jest.spyOn(store, 'dispatch');

afterEach(() => {
  store.dispatch({type: '@@redux/INIT'});
});

describe('fetchTasks', () => {
  it('sets ajax state to "fetching"', () => {
    const thunk = fetchTasks();
    const expectedAction = updateTaskMeta({ajaxState: 'fetching'});

    thunk(dispatch);

    expect(dispatch).toHaveBeenCalledWith(expectedAction);
  });

  describe('on success', () => {
    beforeEach(() => {
      const thunk = fetchTasks();

      thunk(dispatch);

      request.mock.calls[0][0].success({data: [], included: []});
    });

    it('sets ajax state to "ready"', () => {
      const expectedAction = updateTaskMeta({ajaxState: 'ready'});

      expect(dispatch).toHaveBeenCalledWith(expectedAction);
    });
  });
});

describe('createTask', () => {
  it('sets ajax state to "taskSaving"', () => {
    const thunk = createTask();
    const expectedAction = updateTaskMeta({ajaxState: 'taskSaving'});

    thunk(dispatch);

    expect(dispatch).toHaveBeenCalledWith(expectedAction);
  });

  describe('on success', () => {
    beforeEach(() => {
      const thunk = createTask();

      thunk(dispatch);

      request.mock.calls[0][0].success({data: [], included: []});
    });

    it('sets ajax state to "ready"', () => {
      const expectedAction = updateTaskMeta({ajaxState: 'ready'});

      expect(dispatch).toHaveBeenCalledWith(expectedAction);
    });
  });
});

describe('updateTask', () => {
  const taskAttrs = {id: 5, title: 'foo'};

  beforeEach(() => {
    store.dispatch({type: SET, payload: [taskAttrs]});
  });

  it('updates the client task with "marking_done" when marking done', () => {
    const updateThunk = updateTask(taskAttrs.id, {done: true});
    const payload = {id: 5, loadingState: 'marking_done'};

    updateThunk(dispatch);

    expect(dispatch).toHaveBeenCalledWith({type: UPDATE, payload});
  });

  it('updates the client task with "postponing" when postponing', () => {
    const updateThunk = updateTask(taskAttrs.id, {postpone: true});
    const payload = {id: 5, loadingState: 'postponing'};

    updateThunk(dispatch);

    expect(dispatch).toHaveBeenCalledWith({type: UPDATE, payload});
  });

  it('updates the client task with "updating" otherwise', () => {
    const updateThunk = updateTask(taskAttrs.id, {title: 'foo blah #bar'});
    const payload = {id: 5, loadingState: 'updating'};

    updateThunk(dispatch);

    expect(dispatch).toHaveBeenCalledWith({type: UPDATE, payload});
  });

  it('sends a request to the server', () => {
    const updateThunk = updateTask(taskAttrs.id, {title: 'bar'});
    const expected = {
      data: {task: {title: 'bar'}},
      url: 'tasks/5',
      success: expect.any(Function),
    };

    updateThunk(dispatch);

    expect(request).toHaveBeenCalledWith(expected);
  });

  describe('on success', () => {
    beforeEach(() => {
      const updateThunk = updateTask(taskAttrs.id, {title: 'bar'});

      updateThunk(dispatch);

      expect(request).toHaveBeenCalled();

      request.mock.calls[0][0].success();
    });

    it('dispatches fetchTasks', () => {
      expect(dispatch).toHaveBeenCalledWith(expect.any(Function));
    });

    it('marks TaskStore unloaded', () => {
      expect(TaskStore.unload).toHaveBeenCalled();
    });
  });
});

describe('updateTaskMeta', () => {
  it('returns an UPDATE_META action', () => {
    expect(updateTaskMeta('foo')).toEqual({type: UPDATE_META, payload: 'foo'});
  });
});
