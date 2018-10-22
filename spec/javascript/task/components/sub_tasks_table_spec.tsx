import React from 'react';
import {shallow} from 'enzyme';

import {makeTask} from '_test_helpers/factories';

import SubTasksTable, {Props} from 'src/task/components/sub_tasks_table';

const props: Props = {
  deleteTask: jest.fn(),
  updateTask: jest.fn(),
  subTasks: [],
};

it('renders sub-task rows', () => {
  const subTasks = [makeTask({}), makeTask({})];
  const component = shallow(<SubTasksTable {...props} subTasks={subTasks} />);

  expect(component.find('TaskRow')).toHaveLength(2);
});

it('returns null when there are no sub tasks', () => {
  const component = shallow(<SubTasksTable {...props} />);

  expect(component.type()).toBeNull();
});
