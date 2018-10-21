import React from 'react';
import {shallow} from 'enzyme';

import TaskParentListItem, {Props} from 'src/task/components/parent_list_item';

import {makeTask} from '_test_helpers/factories';

const task = makeTask({title: 'foo title'});
const props: Props = {
  task,
  tasksByParentId: {[task.id]: []},
  updateTask: jest.fn(),
};

it('renders the task title', () => {
  const component = shallow(<TaskParentListItem {...props} />);

  expect(component.find('.task-item__title')).toHaveText('foo title');
});

it('renders a new nested list', () => {
  const component = shallow(<TaskParentListItem {...props} />);

  expect(component.find('TaskNestedList')).toHaveLength(1);
});

it('renders a disabled checkbox for the task', () => {
  const component = shallow(<TaskParentListItem {...props} />);

  const checkbox = component.find('TaskCheckbox');

  expect(checkbox).toHaveProp('task', task);
  expect(checkbox).toHaveProp('disabled', true);
});

it('adds a priority class to title when task has a priority', () => {
  const overrides = {task: {...task, priority: 2}};
  const component = shallow(<TaskParentListItem {...props} {...overrides} />);

  const titleClasses = component.find('span').prop('className').split(' ');
  expect(titleClasses).toContain('task-item__title--priority-2');
});

it('does not add a priority class to title when task has no priority', () => {
  const component = shallow(<TaskParentListItem {...props} />);

  const titleClass = component.find('span').prop('className');
  expect(titleClass).not.toMatch('priority');
});
