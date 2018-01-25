import React from 'react';
import {shallow} from 'enzyme';

import TaskTreeView from 'src/task/components/tree_view';

import {makeTask} from '_test_helpers/factories';

const parentTask = makeTask({title: 'I am the parent'});
const childTask = makeTask();
const tasksByParentId = {[parentTask.id]: [childTask]};
const props = {
  tasks: [parentTask],
  tasksByParentId,
};

it('renders the task list header', () => {
  const component = shallow(<TaskTreeView {...props} />);

  expect(component.find('TaskListHeader')).toBePresent();
});

it('renders a task tree for each task', () => {
  const component = shallow(<TaskTreeView {...props} />);
  const tree = component.find('TaskTree');

  expect(tree).toHaveLength(1);
  expect(tree).toHaveProp('task', parentTask);
  expect(tree).toHaveProp('tasksByParentId', tasksByParentId);
});
