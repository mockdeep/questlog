import React from 'react';
import {shallow} from 'enzyme';

import TaskNestedList from 'src/task/components/nested_list';

import {makeTask} from '_test_helpers/factories';

const parentTask = makeTask({title: 'I am the parent'});
const childTask = makeTask({});
const props = {
  tasks: [parentTask],
  tasksByParentId: {[parentTask.id]: [childTask]},
  updateTask: jest.fn(),
};

it('renders a parent list item when task has sub-tasks', () => {
  const component = shallow(<TaskNestedList {...props} />);

  const parentListItem = component.find('TaskParentListItem');
  expect(parentListItem).toHaveLength(1);
  expect(parentListItem).toHaveProp('task', parentTask);
});

it('renders a leaf list item when task has no sub-tasks', () => {
  const overrides = {tasksByParentId: {[parentTask.id]: []}};
  const component = shallow(<TaskNestedList {...props} {...overrides} />);

  expect(component.find('TaskParentListItem')).toHaveLength(0);
  const leafListItem = component.find('TaskLeafListItem');
  expect(leafListItem).toHaveLength(1);
  expect(leafListItem).toHaveProp('task', parentTask);
});
