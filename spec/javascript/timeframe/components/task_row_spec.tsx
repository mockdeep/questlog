import React from 'react';
import {shallow} from 'enzyme';

import {makeTask} from '_test_helpers/factories';

import type {Props} from 'src/timeframe/components/task_row';
import TaskRow from 'src/timeframe/components/task_row';

const props: Props = {
  deleteTask: jest.fn(),
  updateTask: jest.fn(),
  task: makeTask(),
  timeframeSpace: {},
};

it('renders a table row', () => {
  const component = shallow(<TaskRow {...props} />);

  expect(component.find('tr')).toHaveClassName('tasks-table__row');
});

it('renders the timeframe selector', () => {
  const component = shallow(<TaskRow {...props} />);

  expect(component.find('select.timeframe-select')).toExist();
});

it('renders an undo button when task is pending', () => {
  const task = makeTask({pending: true});
  const component = shallow(<TaskRow {...props} task={task} />);

  const buttons = component.find('button');
  expect(buttons).toHaveLength(3);
  expect(buttons.at(1)).toHaveProp('children', 'UNDO');
});

it('does not render an undo button when task is not pending', () => {
  const task = makeTask({pending: false});
  const component = shallow(<TaskRow {...props} task={task} />);

  const buttons = component.find('button');
  expect(buttons).toHaveLength(2);
  expect(buttons.at(0)).toHaveProp('children', 'DONE');
  expect(buttons.at(1)).toHaveProp('children', 'DELETE');
});
