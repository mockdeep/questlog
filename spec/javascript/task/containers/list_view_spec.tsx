jest.mock('src/route/selectors');

import React from 'react';
import {Provider} from 'react-redux';
import {mount} from 'enzyme';

import TaskListView from 'src/task/components/list_view';
import TaskListViewContainer from 'src/task/containers/list_view';
import createAppStore from 'src/create_app_store';
import {setRoute} from 'src/route/action_creators';

it('wraps the TaskListView component', () => {
  const store = createAppStore();

  store.dispatch(setRoute({name: 'tasks'}));
  const container = mount(
    <Provider store={store}><TaskListViewContainer /></Provider>,
  );

  expect(container.find(TaskListView)).toExist();
});
