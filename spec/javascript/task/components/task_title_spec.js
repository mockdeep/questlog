import React from 'react';
import {shallow} from 'enzyme';

import TaskTitle from 'src/task/components/task_title';

const props = {
  deleteTask: jest.fn(),
  task: {},
};

it('renders the task title', () => {
  const component = shallow(<TaskTitle {...props} task={{title: 'some task'}} />);

  expect(component).toIncludeText('some task');
});
