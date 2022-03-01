import React from 'react';
import {shallow} from 'enzyme';

import NewTaskForm from 'src/task/components/new_task_form';

const createTask = jest.fn();
const updateTaskMeta = jest.fn();
const props = {
  createTask,
  task: {title: ''},
  taskSaving: false,
  updateTaskMeta,
};

it('sets the temporary task title on change', () => {
  const component = shallow(<NewTaskForm {...props} />);
  const fakeEvent = {target: {value: 'mytext'}};

  component.find("input[type='text']").simulate('change', fakeEvent);

  expect(updateTaskMeta).toHaveBeenLastCalledWith({newTask: {title: 'mytext'}});
});
