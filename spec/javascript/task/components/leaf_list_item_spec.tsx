import React from 'react';
import {shallow} from 'enzyme';

import TaskLeafListItem from 'src/task/components/leaf_list_item';

import {makeTask} from '_test_helpers/factories';

const task = makeTask({title: 'some title'});
const updateTask = jest.fn();
const props = {task, updateTask};

it('renders the task title', () => {
  const component = shallow(<TaskLeafListItem {...props} />);

  expect(component.find('.task-item__title')).toHaveText('some title');
});

it('renders a task checkbox', () => {
  const component = shallow(<TaskLeafListItem {...props} />);

  const checkbox = component.find('TaskCheckbox');
  expect(checkbox).toHaveProp('task', task);
  const {toggleDone} = (component.instance() as TaskLeafListItem);
  expect(checkbox).toHaveProp('onChange', toggleDone);
  expect(checkbox).toHaveProp('checked', false);
});

it('sets the task checkbox to "checked" when task is "done"', () => {
  const overrides = {task: makeTask({status: 'done'})};

  const component = shallow(<TaskLeafListItem {...props} {...overrides} />);

  expect(component.find('TaskCheckbox')).toHaveProp('checked', true);
});

it('updates the task to done when the checkbox gets checked', () => {
  const component = shallow(<TaskLeafListItem {...props} />);
  const stopPropagation = jest.fn();
  const target = {checked: true};

  component.find('TaskCheckbox').simulate('change', {stopPropagation, target});

  expect(updateTask).toHaveBeenCalledTimes(1);
  expect(updateTask).toHaveBeenCalledWith(task.id, {done: true});
});

it('updates the task to not done when the checkbox gets unchecked', () => {
  const component = shallow(<TaskLeafListItem {...props} />);
  const stopPropagation = jest.fn();
  const target = {checked: false};

  component.find('TaskCheckbox').simulate('change', {stopPropagation, target});

  expect(updateTask).toHaveBeenCalledTimes(1);
  expect(updateTask).toHaveBeenCalledWith(task.id, {done: false});
});

it('adds a priority class to title when task has a priority', () => {
  const overrides = {task: {...task, priority: 2}};
  const component = shallow(<TaskLeafListItem {...props} {...overrides} />);

  const titleClasses = component.find('span').prop('className').split(' ');
  expect(titleClasses).toContain('task-item__title--priority-2');
});

it('does not add a priority class to title when task has no priority', () => {
  const component = shallow(<TaskLeafListItem {...props} />);

  const titleClass = component.find('span').prop('className');
  expect(titleClass).not.toMatch('priority');
});
