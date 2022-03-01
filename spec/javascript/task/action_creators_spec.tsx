jest.mock('src/_helpers/ajax');
jest.mock('src/task/store');

import {Dispatch, Store} from 'redux';

import {makeState} from '_test_helpers/factories';

import createAppStore from 'src/create_app_store';
import {ajaxDelete, ajaxGet, ajaxPut} from 'src/_helpers/ajax';
import TaskStore from 'src/task/store';
import {
  DELETE, SET, UPDATE, UPDATE_META,
  deleteTask, fetchTasks, updateTask, updateTaskMeta,
} from 'src/task/action_creators';
import {upsertTagPlain} from 'src/tag/action_creators';

let store: Store;
let dispatch: Dispatch;

beforeEach(() => {
  store = createAppStore();
  jest.spyOn(store, 'dispatch');
  dispatch = store.dispatch;
});

describe('fetchTasks', () => {
  it('sets ajax state to "fetching"', () => {
    const promise = Promise.resolve({data: [], included: []});
    (ajaxGet as jest.Mock).mockReturnValue(promise);
    const thunk = fetchTasks();
    const expectedAction = updateTaskMeta({ajaxState: 'fetching'});

    thunk(dispatch, () => makeState(), null);

    expect(dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('sets ajax state to "ready" on success', async () => {
    const promise = Promise.resolve({data: [], included: []});
    (ajaxGet as jest.Mock).mockReturnValue(promise);

    const thunk = fetchTasks();

    await thunk(store.dispatch, () => makeState(), null);

    const expectedAction = updateTaskMeta({ajaxState: 'ready'});

    expect(dispatch).toHaveBeenCalledWith(expectedAction);
  });
});

describe('deleteTask', () => {
  it('sends a delete request to the server', async () => {
    const thunk = deleteTask(5);
    const state = makeState();

    (ajaxDelete as jest.Mock).mockReturnValue(Promise.resolve());

    await thunk(dispatch, () => state, null);

    expect(ajaxDelete).toHaveBeenCalledWith('/api/v1/tasks/5');
  });

  it('re-fetches tasks', async () => {
    const thunk = deleteTask(5);
    const state = makeState();

    (ajaxDelete as jest.Mock).mockReturnValue(Promise.resolve());

    await thunk(dispatch, () => state, null);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenLastCalledWith({type: DELETE, payload: 5});
  });

  it('unloads the task store', async () => {
    const thunk = deleteTask(5);
    const state = makeState();

    (ajaxDelete as jest.Mock).mockReturnValue(Promise.resolve());

    await thunk(dispatch, () => state, null);

    expect(TaskStore.unload).toHaveBeenCalled();
  });
});

describe('updateTask', () => {
  const taskAttrs = {id: 5, title: 'foo'};

  beforeEach(() => {
    store.dispatch({type: SET, payload: [taskAttrs]});
    const promise = Promise.resolve({data: [], included: []});
    (ajaxPut as jest.Mock).mockReturnValue(promise);
  });

  it('updates the client task with "marking_done" when marking done', () => {
    const updateThunk = updateTask(taskAttrs.id, {title: 'foo', done: true});
    const payload = {id: 5, loadingState: 'marking_done'};
    const state = makeState();

    updateThunk(dispatch, () => state, null);

    expect(dispatch).toHaveBeenCalledWith({type: UPDATE, payload});
  });

  it('updates the client task with "postponing" when postponing', () => {
    const updateThunk =
      updateTask(taskAttrs.id, {title: 'foo', postpone: true});
    const payload = {id: 5, loadingState: 'postponing'};
    const state = makeState();

    updateThunk(dispatch, () => state, null);

    expect(dispatch).toHaveBeenCalledWith({type: UPDATE, payload});
  });

  it('updates the client task with "updating" otherwise', () => {
    const updateThunk = updateTask(taskAttrs.id, {title: 'foo blah #bar'});
    const payload = {id: 5, loadingState: 'updating'};
    const state = makeState();

    updateThunk(dispatch, () => state, null);

    expect(dispatch).toHaveBeenCalledWith({type: UPDATE, payload});
  });

  it('sends a request to the server', () => {
    const updateThunk = updateTask(taskAttrs.id, {title: 'bar'});
    const expected = ['/api/v1/tasks/5', {task: {title: 'bar'}}];
    const state = makeState();

    updateThunk(dispatch, () => state, null);

    expect(ajaxPut).toHaveBeenCalledWith(...expected);
  });

  describe('on success', () => {
    beforeEach(() => {
      const data = {title: 'fooble doo'};
      const included = [
        {rules: [{check: 'isBlank'}]},
        {rules: [{check: 'isEmpty'}]},
      ];
      (ajaxPut as jest.Mock).mockReturnValue(Promise.resolve({data, included}));

      const updateThunk = updateTask(taskAttrs.id, {title: 'bar'});
      const state = makeState();

      updateThunk(dispatch, () => state, null);

      expect(ajaxPut).toHaveBeenCalled();
    });

    it('dispatches an UPDATE action', () => {
      const payload = {id: taskAttrs.id, title: 'fooble doo'};
      expect(dispatch).toHaveBeenCalledWith({type: UPDATE, payload});
    });

    it('upserts associated tags', () => {
      const [thunk] = (dispatch as jest.Mock).mock.calls[3];
      expect(thunk).toBeInstanceOf(Function);
      expect(thunk.name).toBe('upsertTagsThunk');

      thunk(dispatch);

      const tag1: AjaxTag = {rules: [{check: 'isBlank'}]};
      const tag2: AjaxTag = {rules: [{check: 'isEmpty'}]};

      expect(dispatch).toHaveBeenCalledWith(upsertTagPlain(tag1));
      expect(dispatch).toHaveBeenCalledWith(upsertTagPlain(tag2));
    });

    it('marks TaskStore unloaded', () => {
      expect(TaskStore.unload).toHaveBeenCalled();
    });
  });
});

describe('updateTaskMeta', () => {
  it('returns an UPDATE_META action', () => {
    const payload: Partial<TaskMeta> = {ajaxState: 'taskSaving'};

    expect(updateTaskMeta(payload)).toEqual({type: UPDATE_META, payload});
  });
});
