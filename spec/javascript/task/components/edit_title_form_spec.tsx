import React from 'react';
import {shallow} from 'enzyme';

import {makeTask} from '_test_helpers/factories';

import TaskEditTitleForm, {Props} from 'src/task/components/edit_title_form';
import Textarea from 'react-textarea-autosize';

const updateTask = jest.fn();
const props: Props = {
  task: makeTask({id: 52, title: 'a title'}),
  updateTask,
};
it('renders the task title in the input', () => {
  const component = shallow(<TaskEditTitleForm {...props} />);

  expect(component.find(Textarea)).toHaveProp('value', 'a title');
});

it('updates the task when form is submitted', () => {
  const component = shallow(<TaskEditTitleForm {...props} />);
  component.find(Textarea).simulate('change', {target: {value: 'new title'}});
  const preventDefault = jest.fn();
  const textarea = document.createElement('textarea');

  (component.find(Textarea).prop('inputRef') as Function)(textarea);
  component.find('form').simulate('submit', {preventDefault});

  expect(preventDefault).toHaveBeenCalled();
  expect(updateTask).toHaveBeenCalledWith(52, {title: 'new title'});
});

it('only updates once on submit', () => {
  const component = shallow(<TaskEditTitleForm {...props} />);
  component.find(Textarea).simulate('change', {target: {value: 'new title'}});
  const preventDefault = jest.fn();
  const fakeEvent = {preventDefault};
  const textarea = document.createElement('textarea');
  const textareaComponent = component.find(Textarea);

  const blur = jest.fn(() => textareaComponent.simulate('blur', fakeEvent));
  (textareaComponent.prop('inputRef') as Function)({...textarea, blur});
  component.find('form').simulate('submit', fakeEvent);

  expect(preventDefault).toHaveBeenCalledTimes(2);
  expect(updateTask).toHaveBeenCalledTimes(1);
  expect(updateTask).toHaveBeenCalledWith(52, {title: 'new title'});
});

it('updates the task when the input blurs', () => {
  const component = shallow(<TaskEditTitleForm {...props} />);
  component.find(Textarea).simulate('change', {target: {value: 'new title'}});
  const preventDefault = jest.fn();
  const textarea = document.createElement('textarea');

  (component.find(Textarea).prop('inputRef') as Function)(textarea);
  component.find(Textarea).simulate('blur', {preventDefault});

  expect(preventDefault).toHaveBeenCalled();
  expect(updateTask).toHaveBeenCalledWith(52, {title: 'new title'});
});

it('updates the task when the user hits Enter', () => {
  const component = shallow(<TaskEditTitleForm {...props} />);
  component.find(Textarea).simulate('change', {target: {value: 'new title'}});
  const preventDefault = jest.fn();
  const textarea = document.createElement('textarea');

  (component.find(Textarea).prop('inputRef') as Function)(textarea);
  component.find(Textarea).simulate('keyPress', {key: 'Enter', preventDefault});

  expect(preventDefault).toHaveBeenCalled();
  expect(updateTask).toHaveBeenCalledWith(52, {title: 'new title'});
});

it('does not update the task when the user hits a letter key', () => {
  const component = shallow(<TaskEditTitleForm {...props} />);
  component.find(Textarea).simulate('change', {target: {value: 'new title'}});
  const preventDefault = jest.fn();
  const textarea = document.createElement('textarea');

  (component.find(Textarea).prop('inputRef') as Function)(textarea);
  component.find(Textarea).simulate('keyPress', {key: 'k', preventDefault});

  expect(preventDefault).not.toHaveBeenCalled();
  expect(updateTask).not.toHaveBeenCalled();
});

it('sets focused class when the field focuses', () => {
  const component = shallow(<TaskEditTitleForm {...props} />);
  let textarea = component.find(Textarea);

  expect(textarea).toHaveProp('className', 'task-input hidden-border');

  component.find(Textarea).simulate('focus');

  textarea = component.find(Textarea);

  expect(textarea).toHaveProp('className', 'task-input');
});
