import React from 'react';
import {shallow} from 'enzyme';

import createAppStore from 'src/create_app_store';
import TaskTreeViewContainer from 'src/task/containers/tree_view';

it('wraps the TaskTreeView component', () => {
  const store = createAppStore();
  const container = shallow(<TaskTreeViewContainer store={store} />);

  expect(container.find('TaskTreeView')).toBePresent();
});
