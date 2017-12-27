import React from 'react';
import {shallow} from 'enzyme';

import TaskRow from 'src/task/components/task_row';

const props = {
  deleteTask: jest.fn(),
  updateTask: jest.fn(),
  keyPrefix: 'testPrefix',
};

it('renders a table row', () => {
  const component = shallow(<TaskRow {...props} task={{}} />);

  expect(component.find('tr')).toHaveClassName('task-list__row');
});
