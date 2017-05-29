jest.mock('src/_helpers/request');
jest.mock('src/task/store');

import request from 'src/_helpers/request';
import TaskStore from 'src/task/store';
import {fetchTasks, updateTask} from 'src/task/action_creators';

describe('updateTask', () => {
  let updateThunk;
  const dispatch = jest.fn();
  const taskAttrs = {id: 5, title: 'foo'};

  beforeEach(() => {
    updateThunk = updateTask(taskAttrs);
  });

  it('sends a request to the server', () => {
    const expected = {
      data: {task: taskAttrs},
      url: 'tasks/5',
      success: expect.any(Function),
    };

    updateThunk();

    expect(request).toHaveBeenCalledWith(expected);
  });

  describe('on success', () => {
    beforeEach(() => {
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
