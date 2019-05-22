import React from 'react';
import {shallow} from 'enzyme';

import TaskListFilters from 'src/task/components/list_filters';

it('renders links to filters', () => {
  const component = shallow(<TaskListFilters />);
  const filters = component.find('ConnectFunction[baseClass="task-filter"]');

  expect(filters).toHaveLength(4);
});
