import React from 'react';
import {mount} from 'enzyme';

import TaskEditTitleForm from 'src/task/components/edit_title_form';

const props = {
  scratch: {},
  task: {id: 52, title: 'a title'},
  updateScratch: jest.fn(),
  updateTask: jest.fn(),
};

it('renders the task title in the input', () => {
  const component = mount(<TaskEditTitleForm {...props} />);

  expect(component.find('input')).toHaveProp('value', 'a title');
});

it('updates the value of the task title when input is changed', () => {
  const component = mount(<TaskEditTitleForm {...props} />);

  component.find('input').simulate('change', {target: {value: 'new title'}});

  expect(props.updateScratch).toHaveBeenCalledWith({taskTitle: 'new title'});
});

it('updates the task when form is submitted', () => {
  const overrides = {scratch: {taskTitle: 'scratch title'}};
  const component = mount(<TaskEditTitleForm {...props} {...overrides} />);
  const preventDefault = jest.fn();

  component.find('form').simulate('submit', {preventDefault});

  expect(preventDefault).toHaveBeenCalled();
  expect(props.updateTask).toHaveBeenCalledWith(52, {title: 'scratch title'});
});

it('updates the task when the input blurs', () => {
  const scratch = {taskTitle: 'scratch title'};
  const component = mount(<TaskEditTitleForm {...props} scratch={scratch} />);
  const preventDefault = jest.fn();

  component.find('input').simulate('blur', {preventDefault});

  expect(preventDefault).toHaveBeenCalled();
  expect(props.updateTask).toHaveBeenCalledWith(52, {title: 'scratch title'});
});

it('updates the scratch title when a new task is given', () => {
  const scratch = {taskTitle: 'scratch title'};
  const component = mount(<TaskEditTitleForm {...props} scratch={scratch} />);
  component.setProps({task: {id: 501, title: 'next task'}});

  const expected = {focused: false, taskTitle: 'next task'};
  expect(props.updateScratch).toHaveBeenCalledWith(expected);
});
