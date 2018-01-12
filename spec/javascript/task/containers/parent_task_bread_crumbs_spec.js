import React from 'react';
import {shallow} from 'enzyme';

import {
  ParentTaskBreadCrumbs,
} from 'src/task/containers/parent_task_bread_crumbs';

import {makeTask} from '_test_helpers/factories';

it('renders nothing when there is no task', () => {
  const component = shallow(<ParentTaskBreadCrumbs />);

  expect(component.type()).toBeNull();
});

it('renders a link to the task when present', () => {
  const task = makeTask();
  const component = shallow(<ParentTaskBreadCrumbs task={task} />);

  expect(component.find('TaskLink')).toHaveProp('task', task);
});

it('renders a parent task link recursively when tree goes deeper', () => {
  const task = makeTask({title: 'some parent', parentTaskId: 5});
  const component = shallow(<ParentTaskBreadCrumbs task={task} />);
  const container = component.find('Connect(ParentTaskBreadCrumbs)');

  expect(container).toHaveProp('taskId', 5);
});
