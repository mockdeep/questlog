jest.mock('src/task/store');

import React from 'react';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';

import createAppStore from 'src/create_app_store';
import TaskListView from 'src/task/components/list_view';
import TaskStore from 'src/task/store';

const props = {deleteTask: jest.fn(), updateTask: jest.fn()};

it('fetches from TaskStore', () => {
  TaskStore.getState.mockImplementation(() => ({}));
  const provider =
    <Provider store={createAppStore()}>
      <TaskListView {...props} />
    </Provider>;
  mount(provider);

  expect(TaskStore.dispatch).toHaveBeenCalledWith({type: 'tasks/FETCH'});
});
