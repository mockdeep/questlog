jest.mock('src/route/selectors');

import React from 'react';
import {shallow} from 'enzyme';

import createAppStore from 'src/create_app_store';
import TaskListViewContainer from 'src/task/containers/list_view';
import {getRouteName} from 'src/route/selectors';

const TaskListView = 'DragDropContext(TaskListView)';
it('wraps the TaskListView component', () => {
  getRouteName.mockImplementation(() => 'tasks');
  const props = {store: createAppStore()};
  const container = shallow(<TaskListViewContainer {...props} />);

  expect(container.find(TaskListView)).toBePresent();
});
