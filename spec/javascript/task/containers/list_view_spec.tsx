jest.mock('src/route/selectors');

import React from 'react';
import {shallow} from 'enzyme';

import TaskListView from 'src/task/components/list_view';
import TaskListViewContainer from 'src/task/containers/list_view';
import createAppStore from 'src/create_app_store';
import {setRoute} from 'src/route/action_creators';

const props = {store: createAppStore()};

it('wraps the TaskListView component', () => {
  props.store.dispatch(setRoute({name: 'tasks'}));
  const container = shallow(<TaskListViewContainer {...props} />);

  expect(container.find(TaskListView)).toExist();
});
