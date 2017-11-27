import React from 'react';
import {shallow} from 'enzyme';

import TaskEditTitleForm from 'src/task/components/edit_title_form';

const props = {
  saveTask: jest.fn(),
  scratch: {},
  taskTitle: 'some title',
  updateScratch: jest.fn(),
};

it('renders the task title in the input', () => {
  const component = shallow(<TaskEditTitleForm {...props} />);

  expect(component.find('input')).toHaveProp('value', 'some title');
});

it('updates the value of the task title when input is changed', () => {
  const component = shallow(<TaskEditTitleForm {...props} />);

  component.find('input').simulate('change', {target: {value: 'new title'}});

  expect(props.updateScratch).toHaveBeenCalledWith({taskTitle: 'new title'});
});

it('saves the task when the form is submitted', () => {
  const scratch = {taskTitle: 'scratch title'};
  const component = shallow(<TaskEditTitleForm {...props} scratch={scratch} />);
  const preventDefault = jest.fn();

  component.find('form').simulate('submit', {preventDefault});

  expect(preventDefault).toHaveBeenCalled();
  expect(props.saveTask).toHaveBeenCalledWith({title: 'scratch title'});
});

it('save the task when the input blurs', () => {
  const scratch = {taskTitle: 'scratch title'};
  const component = shallow(<TaskEditTitleForm {...props} scratch={scratch} />);
  const preventDefault = jest.fn();

  component.find('input').simulate('blur', {preventDefault});

  expect(preventDefault).toHaveBeenCalled();
  expect(props.saveTask).toHaveBeenCalledWith({title: 'scratch title'});
});
