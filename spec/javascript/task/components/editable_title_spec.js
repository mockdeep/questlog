import React from 'react';
import {shallow} from 'enzyme';

import TaskEditableTitle from 'src/task/components/editable_title';

const props = {
  scratch: {},
  task: {id: 52, title: 'a title'},
  updateScratch: jest.fn(),
  updateTask: jest.fn(),
};

it('renders a static title by default', () => {
  const component = shallow(<TaskEditableTitle {...props} />);

  expect(component.find('span', {text: 'a title'})).toHaveLength(1);
  expect(component.find('Connect(Scratch(TaskEditTitleForm))')).toHaveLength(0);
});

it('renders a editable title when mode is "edit"', () => {
  const scratch = {mode: 'edit'};
  const component = shallow(<TaskEditableTitle {...props} scratch={scratch} />);

  expect(component.find('span', {text: 'a title'})).toHaveLength(0);
  expect(component.find('Connect(Scratch(TaskEditTitleForm))')).toHaveLength(1);
});

it('enables editing when clicking on the title', () => {
  const component = shallow(<TaskEditableTitle {...props} />);

  component.find('span', {text: 'a title'}).simulate('click');

  expect(props.updateScratch).toHaveBeenCalledWith({mode: 'edit'});
});

describe('when saveTask is called', () => {
  it('updates the task', () => {
    const overrides = {scratch: {mode: 'edit'}};
    const component = shallow(<TaskEditableTitle {...props} {...overrides} />);
    const titleForm = component.find('Connect(Scratch(TaskEditTitleForm))');

    titleForm.prop('saveTask')({title: 'new title'});

    expect(props.updateTask).toHaveBeenCalledWith(52, {title: 'new title'});
  });

  it('sets the mode back to "static"', () => {
    const overrides = {scratch: {mode: 'edit'}};
    const component = shallow(<TaskEditableTitle {...props} {...overrides} />);
    const titleForm = component.find('Connect(Scratch(TaskEditTitleForm))');

    titleForm.prop('saveTask')({title: 'new title'});

    expect(props.updateScratch).toHaveBeenCalledWith({mode: 'static'});
  });
});
