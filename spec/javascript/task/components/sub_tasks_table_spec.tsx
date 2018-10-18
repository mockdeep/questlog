import React from 'react';
import {shallow} from 'enzyme';

import SubTasksTable from 'src/task/components/sub_tasks_table';

const props = {
  deleteTask: jest.fn(),
  updateTask: jest.fn(),
};

it('renders sub-task rows', () => {
  const subTasks = [{id: 5}, {id: 10}];
  const component = shallow(<SubTasksTable {...props} subTasks={subTasks} />);

  expect(component.find('TaskRow')).toHaveLength(2);
});

it('returns null when there are no sub tasks', () => {
  const component = shallow(<SubTasksTable {...props} subTasks={[]} />);

  expect(component.type()).toBeNull();
});
