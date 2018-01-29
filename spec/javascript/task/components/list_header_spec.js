import React from 'react';
import {shallow} from 'enzyme';

import TaskListHeader from 'src/task/components/list_header';

it('renders a new task form', () => {
  const component = shallow(<TaskListHeader />);

  expect(component.find('Connect(NewTaskForm)')).toBePresent();
});

it('renders links to filters', () => {
  const component = shallow(<TaskListHeader />);

  expect(component.find('Connect(Link)')).toHaveLength(3);
});
