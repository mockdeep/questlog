jest.mock('src/_helpers/flash');
jest.mock('src/_helpers/ajax');
jest.mock('src/task/store');

import createAppStore from 'src/create_app_store';
import {ajaxDelete, ajaxGet, ajaxPut, ajaxPost} from 'src/_helpers/ajax';
import TaskStore from 'src/task/store';
import {
  SET, UPDATE, UPDATE_META,
  createTask, deleteTask, fetchTasks, updateTask, updateTaskMeta,
} from 'src/task/action_creators';

let store;
let dispatch;

beforeEach(() => {
  store = createAppStore();
  dispatch = jest.spyOn(store, 'dispatch');
});

describe('fetchTasks', () => {
  it('sets ajax state to "fetching"', () => {
    const thunk = fetchTasks();
    const expectedAction = updateTaskMeta({ajaxState: 'fetching'});

    thunk(dispatch);

    expect(dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('sets ajax state to "ready" on success', async () => {
    ajaxGet.mockReturnValue(Promise.resolve({data: [], included: []}));

    const thunk = fetchTasks();

    await thunk(dispatch);

    const expectedAction = updateTaskMeta({ajaxState: 'ready'});

    expect(dispatch).toHaveBeenCalledWith(expectedAction);
  });
});

describe('createTask', () => {
  it('sets ajax state to "taskSaving"', () => {
    const thunk = createTask();
    const expectedAction = updateTaskMeta({ajaxState: 'taskSaving'});

    thunk(dispatch);

    expect(dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('sets ajax state to "ready" on success', async () => {
    const thunk = createTask();

    ajaxPost.mockReturnValue(Promise.resolve());

    await thunk(dispatch);

    const expectedAction = updateTaskMeta({ajaxState: 'ready'});

    expect(dispatch).toHaveBeenCalledWith(expectedAction);
  });
});

describe('deleteTask', () => {
  it('sends a delete request to the server', async () => {
    const thunk = deleteTask(5);

    ajaxDelete.mockReturnValue(Promise.resolve());

    await thunk(dispatch);

    expect(ajaxDelete).toHaveBeenCalledWith('/api/v1/tasks/5');
  });

  it('re-fetches tasks', async () => {
    const thunk = deleteTask(5);

    ajaxDelete.mockReturnValue(Promise.resolve());

    await thunk(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenLastCalledWith(expect.any(Function));
    expect(dispatch.mock.calls[0][0].name).toBe('fetchTasksThunk');
  });

  it('unloads the task store', async () => {
    const thunk = deleteTask(5);

    ajaxDelete.mockReturnValue(Promise.resolve());

    await thunk(dispatch);

    expect(TaskStore.unload).toHaveBeenCalled();
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
    const expected = ['/api/v1/tasks/5', {task: {title: 'bar'}}];

    updateThunk(dispatch);

    expect(ajaxPut).toHaveBeenCalledWith(...expected);
  });

  describe('on success', () => {
    beforeEach(async () => {
      ajaxPut.mockReturnValue(Promise.resolve({data: {title: 'fooble doo'}}));

      const updateThunk = updateTask(taskAttrs.id, {title: 'bar'});

      await updateThunk(dispatch);

      expect(ajaxPut).toHaveBeenCalled();
    });

    it('dispatches an UPDATE action', () => {
      const payload = {id: taskAttrs.id, title: 'fooble doo'};
      expect(dispatch).toHaveBeenCalledWith({type: UPDATE, payload});
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
