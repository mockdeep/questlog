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

it('renders an undo button when task is pending', () => {
  const component = shallow(<TaskRow {...props} task={{pending: true}} />);

  const buttons = component.find('button');
  expect(buttons).toHaveLength(3);
  expect(buttons.at(1)).toHaveProp('children', 'UNDO');
});

it('does not render an undo button when task is not pending', () => {
  const component = shallow(<TaskRow {...props} task={{pending: false}} />);

  const buttons = component.find('button');
  expect(buttons).toHaveLength(2);
  expect(buttons.at(0)).toHaveProp('children', 'DONE');
  expect(buttons.at(1)).toHaveProp('children', 'DELETE');
});
