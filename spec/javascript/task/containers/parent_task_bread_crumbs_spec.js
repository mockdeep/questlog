import React from 'react';
import {shallow} from 'enzyme';

import {ParentTaskBreadCrumbs} from 'src/task/containers/parent_task_bread_crumbs';

it('renders nothing when there is no task', () => {
  const component = shallow(<ParentTaskBreadCrumbs />);

  expect(component.type()).toBeNull();
});

it('renders a link to the task when present', () => {
  const task = {};
  const component = shallow(<ParentTaskBreadCrumbs task={task} />);

  expect(component.find('TaskLink')).toHaveProp('task', task);
});

it('renders a parent task link recursively when tree goes deeper', () => {
  const task = {title: 'some parent', parentTaskId: 5};
  const component = shallow(<ParentTaskBreadCrumbs task={task} />);
  const container = component.find('Connect(ParentTaskBreadCrumbs)');

  expect(container).toHaveProp('taskId', 5);
});
