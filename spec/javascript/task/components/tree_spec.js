import React from 'react';
import {shallow} from 'enzyme';

import TaskTree from 'src/task/components/tree';

import {makeTask} from '_test_helpers/factories';

const parentTask = makeTask({title: 'I am the parent'});
const childTask = makeTask();
const props = {
  task: parentTask,
  tasksByParentId: {[parentTask.id]: [childTask]},
};

it('renders the given task', () => {
  const component = shallow(<TaskTree {...props} />);

  expect(component.find('li')).toIncludeText('I am the parent');
});

it('renders sub-tasks for the given task', () => {
  const component = shallow(<TaskTree {...props} />);

  const taskTree = component.find('TaskTree');
  expect(taskTree).toHaveLength(1);
  expect(taskTree).toHaveProp('task', childTask);
});

it('does not render any sub-trees when there are no sub-tasks', () => {
  const overrides = {tasksByParentId: {[parentTask.id]: []}};
  const component = shallow(<TaskTree {...props} {...overrides} />);

  expect(component.find('ul')).toHaveLength(0);
  expect(component.find('TaskTree')).toHaveLength(0);
});
