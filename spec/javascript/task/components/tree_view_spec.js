import React from 'react';
import {shallow} from 'enzyme';

import TaskTreeView from 'src/task/components/tree_view';

import {makeTask} from '_test_helpers/factories';

const parentTask = makeTask({title: 'I am the parent'});
const childTask = makeTask();
const tasksByParentId = {[parentTask.id]: [childTask]};
const updateTask = jest.fn();
const props = {
  tasks: [parentTask],
  tasksByParentId,
  updateTask,
};

it('renders the task list header', () => {
  const component = shallow(<TaskTreeView {...props} />);

  expect(component.find('TaskListFilters')).toBePresent();
});

it('renders a nested task list for each task', () => {
  const component = shallow(<TaskTreeView {...props} />);
  const nestedList = component.find('TaskNestedList');

  expect(nestedList).toHaveLength(1);
  expect(nestedList).toHaveProp('tasks', [parentTask]);
  expect(nestedList).toHaveProp('tasksByParentId', tasksByParentId);
});
