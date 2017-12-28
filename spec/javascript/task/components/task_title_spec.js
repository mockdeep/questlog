import React from 'react';
import {shallow} from 'enzyme';

import TaskTitle from 'src/task/components/task_title';

const task = {};
const props = {deleteTask: jest.fn(), task};

it('renders an editable title form', () => {
  const component = shallow(<TaskTitle {...props} />);
  const editTitleForm = component.find('Connect(Scratch(TaskEditTitleForm))');

  expect(editTitleForm).toHaveProp('task', task);
});
