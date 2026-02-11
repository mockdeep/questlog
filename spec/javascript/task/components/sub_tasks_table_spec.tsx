import React from 'react';
import {shallow} from 'enzyme';

import {makeTask} from '_test_helpers/factories';

import type {Props} from 'src/task/components/sub_tasks_table';
import SubTasksTable from 'src/task/components/sub_tasks_table';

const props: Props = {
  deleteTask: vi.fn(),
  updateTask: vi.fn(),
  subTasks: [],
};

it('renders sub-task rows', () => {
  const subTasks = [makeTask(), makeTask()];
  const component = shallow(<SubTasksTable {...props} subTasks={subTasks} />);

  expect(component.find('TaskRow')).toHaveLength(2);
});

it('returns null when there are no sub tasks', () => {
  const component = shallow(<SubTasksTable {...props} />);

  expect(component.type()).toBeNull();
});
