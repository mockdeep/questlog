jest.mock('src/_helpers/flash');
jest.mock('src/_helpers/ajax');
jest.mock('src/task/store');

import createAppStore from 'src/create_app_store';
import {ajaxDelete, ajaxGet, ajaxPut, ajaxPost} from 'src/_helpers/ajax';
import TaskStore from 'src/task/store';
import {
  CREATE, DELETE, SET, UPDATE, UPDATE_META,
  createTask, deleteTask, fetchTasks, updateTask, updateTaskMeta,
} from 'src/task/action_creators';
import {upsertTagPlain} from 'src/tag/action_creators';

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
    const promise = Promise.resolve({data: [], included: []});
    (ajaxGet as jest.Mock).mockReturnValue(promise);

    const thunk = fetchTasks();

    await thunk(dispatch);

    const expectedAction = updateTaskMeta({ajaxState: 'ready'});

    expect(dispatch).toHaveBeenCalledWith(expectedAction);
  });
});

describe('createTask', () => {
  it('sets ajax state to "taskSaving"', () => {
    const thunk = createTask({});
    const expectedAction = updateTaskMeta({ajaxState: 'taskSaving'});

    thunk(dispatch);

    expect(dispatch).toHaveBeenCalledWith(expectedAction);
  });

  describe('on success', () => {
    beforeEach(async () => {
      const data = {title: 'fooble doo'};
      const included = [{foo: 'tag'}, {bar: 'tag'}];
      const promise = Promise.resolve({data, included});
      (ajaxPost as jest.Mock).mockReturnValue(promise);

      const createThunk = createTask({title: 'bar'});

      await createThunk(dispatch);

      expect(ajaxPost).toHaveBeenCalled();
    });

    it('sets ajax state to "ready"', () => {
      const expectedAction = updateTaskMeta({ajaxState: 'ready'});

      expect(dispatch).toHaveBeenCalledWith(expectedAction);
    });

    it('dispatches a CREATE action', () => {
      const payload = {title: 'fooble doo'};
      expect(dispatch).toHaveBeenCalledWith({type: CREATE, payload});
    });

    it('upserts associated tags', () => {
      const [thunk] = dispatch.mock.calls[4];
      expect(thunk).toBeInstanceOf(Function);
      expect(thunk.name).toBe('upsertTagsThunk');

      thunk(dispatch);

      expect(dispatch).toHaveBeenCalledWith(upsertTagPlain({foo: 'tag'}));
      expect(dispatch).toHaveBeenCalledWith(upsertTagPlain({bar: 'tag'}));
    });

    it('marks TaskStore unloaded', () => {
      expect(TaskStore.unload).toHaveBeenCalled();
    });
  });
});

describe('deleteTask', () => {
  it('sends a delete request to the server', async () => {
    const thunk = deleteTask(5);

    (ajaxDelete as jest.Mock).mockReturnValue(Promise.resolve());

    await thunk(dispatch);

    expect(ajaxDelete).toHaveBeenCalledWith('/api/v1/tasks/5');
  });

  it('re-fetches tasks', async () => {
    const thunk = deleteTask(5);

    (ajaxDelete as jest.Mock).mockReturnValue(Promise.resolve());

    await thunk(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenLastCalledWith({type: DELETE, payload: 5});
  });

  it('unloads the task store', async () => {
    const thunk = deleteTask(5);

    (ajaxDelete as jest.Mock).mockReturnValue(Promise.resolve());

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
      const data = {title: 'fooble doo'};
      const included = [{foo: 'tag'}, {bar: 'tag'}];
      (ajaxPut as jest.Mock).mockReturnValue(Promise.resolve({data, included}));

      const updateThunk = updateTask(taskAttrs.id, {title: 'bar'});

      await updateThunk(dispatch);

      expect(ajaxPut).toHaveBeenCalled();
    });

    it('dispatches an UPDATE action', () => {
      const payload = {id: taskAttrs.id, title: 'fooble doo'};
      expect(dispatch).toHaveBeenCalledWith({type: UPDATE, payload});
    });

    it('upserts associated tags', () => {
      const [thunk] = dispatch.mock.calls[3];
      expect(thunk).toBeInstanceOf(Function);
      expect(thunk.name).toBe('upsertTagsThunk');

      thunk(dispatch);

      expect(dispatch).toHaveBeenCalledWith(upsertTagPlain({foo: 'tag'}));
      expect(dispatch).toHaveBeenCalledWith(upsertTagPlain({bar: 'tag'}));
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
