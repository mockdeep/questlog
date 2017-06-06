jest.mock('src/_helpers/request');
jest.mock('src/task/store');

import store from 'src/app_store';
import request from 'src/_helpers/request';
import TaskStore from 'src/task/store';
import {SET, UPDATE, updateTask} from 'src/task/action_creators';

afterEach(() => {
  store.dispatch({type: '@@redux/INIT'});
});

describe('updateTask', () => {
  const taskAttrs = {id: 5, title: 'foo'};
  const dispatch = jest.spyOn(store, 'dispatch');

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
