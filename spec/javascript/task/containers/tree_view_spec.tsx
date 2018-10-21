import React from 'react';
import {shallow} from 'enzyme';

import createAppStore from 'src/create_app_store';
import TaskTreeViewContainer from 'src/task/containers/tree_view';

const props = {store: createAppStore()};

it('wraps the TaskTreeView component', () => {
  const container = shallow(<TaskTreeViewContainer {...props} />);

  expect(container.find('TaskTreeView')).toExist();
});
