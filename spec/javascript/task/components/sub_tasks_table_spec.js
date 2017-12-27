import React from 'react';
import {shallow} from 'enzyme';

import SubTasksTable from 'src/task/components/sub_tasks_table';

const props = {
  deleteTask: jest.fn(),
  updateTask: jest.fn(),
};

it('renders sub-task rows for a task', () => {
  const task = {subTasks: [{id: 5}, {id: 10}]};
  const component = shallow(<SubTasksTable {...props} task={task} />);

  expect(component.find('TaskRow')).toHaveLength(2);
});

it('returns null when there are no sub tasks', () => {
  const component = shallow(<SubTasksTable {...props} task={{subTasks: []}} />);

  expect(component.type()).toBeNull();
});
