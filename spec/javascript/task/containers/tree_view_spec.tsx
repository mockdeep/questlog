import React from 'react';
import {Provider} from 'react-redux';
import {mount} from 'enzyme';

import createAppStore from 'src/create_app_store';
import TaskTreeViewContainer from 'src/task/containers/tree_view';

it('wraps the TaskTreeView component', () => {
  const container = mount(
    <Provider store={createAppStore()}><TaskTreeViewContainer /></Provider>,
  );

  expect(container.find('TaskTreeView')).toExist();
});
