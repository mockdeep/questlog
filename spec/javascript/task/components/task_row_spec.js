import React from 'react';
import {shallow} from 'enzyme';

import TaskRow from 'src/task/components/task_row';

const props = {
  deleteTask: jest.fn(),
  updateTask: jest.fn(),
  keyPrefix: 'testPrefix',
  task: {},
};

it('renders a table row', () => {
  const component = shallow(<TaskRow {...props} />);

  expect(component.find('tr')).toHaveClassName('task-list__row');
});

it('renders the timeframe selector when enabled', () => {
  const component = shallow(<TaskRow {...props} timeframesEnabled />);

  expect(component.find('select.timeframe-select')).toBePresent();
});
