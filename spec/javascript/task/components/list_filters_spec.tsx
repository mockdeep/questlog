import React from 'react';
import {shallow} from 'enzyme';

import TaskListFilters from 'src/task/components/list_filters';

it('renders links to filters', () => {
  const component = shallow(<TaskListFilters />);

  expect(component.find('Connect(Link)')).toHaveLength(4);
});
