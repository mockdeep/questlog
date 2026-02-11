import React from 'react';
import {mount} from 'enzyme';

import {makeTask} from '_test_helpers/factories';

import type {Props} from 'src/task/components/edit_title_form';
import TaskEditTitleForm from 'src/task/components/edit_title_form';
import Textarea from 'react-textarea-autosize';

const props: Props = {
  task: makeTask({id: 52, title: 'a title'}),
};
it('renders the task title in the input', () => {
  const component = mount(<TaskEditTitleForm {...props} />);

  expect(component.find(Textarea)).toHaveProp('defaultValue', 'a title');
});

it('updates the task when the input blurs', () => {
  const component = mount(<TaskEditTitleForm {...props} />);
  component.find(Textarea).simulate('change', {target: {value: 'new title'}});
  const preventDefault = vi.fn();

  component.find(Textarea).simulate('blur', {preventDefault});

  expect(preventDefault).toHaveBeenCalled();
});

it('updates the task when the user hits Enter', () => {
  const component = mount(<TaskEditTitleForm {...props} />);
  component.find(Textarea).simulate('change', {target: {value: 'new title'}});
  const preventDefault = vi.fn();

  component.find(Textarea).simulate('keyPress', {key: 'Enter', preventDefault});

  expect(preventDefault).toHaveBeenCalled();
});

it('does not update the task when the user hits a letter key', () => {
  const component = mount(<TaskEditTitleForm {...props} />);
  component.find(Textarea).simulate('change', {target: {value: 'new title'}});
  const preventDefault = vi.fn();

  component.find(Textarea).simulate('keyPress', {key: 'k', preventDefault});

  expect(preventDefault).not.toHaveBeenCalled();
});

it('sets focused class when the field focuses', () => {
  const component = mount(<TaskEditTitleForm {...props} />);
  let textarea = component.find(Textarea);

  expect(textarea).toHaveProp('className', 'task-input hidden-border');

  component.find(Textarea).simulate('focus');

  textarea = component.find(Textarea);

  expect(textarea).toHaveProp('className', 'task-input');
});
