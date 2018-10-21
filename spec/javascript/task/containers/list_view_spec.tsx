jest.mock('src/route/selectors');

import React from 'react';
import {shallow} from 'enzyme';

import createAppStore from 'src/create_app_store';
import TaskListViewContainer from 'src/task/containers/list_view';
import {setRoute} from 'src/route/action_creators';

const props = {store: createAppStore()};

const TaskListView = 'DragDropContext(TaskListView)';
it('wraps the TaskListView component', () => {
  props.store.dispatch(setRoute({name: 'tasks'}));
  const container = shallow(<TaskListViewContainer {...props} />);

  expect(container.find(TaskListView)).toExist();
});
