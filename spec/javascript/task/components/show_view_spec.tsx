import React from 'react';
import {shallow} from 'enzyme';

import type {Props} from 'src/task/components/show_view';
import TaskShowView from 'src/task/components/show_view';

import {makeTask} from '_test_helpers/factories';

const props: Props = {
  deleteTask: vi.fn(),
  updateTask: vi.fn(),
  task: makeTask(),
  subTasks: [],
};

it('renders something when the task is present', () => {
  const task = makeTask({title: 'foo title'});

  const component = shallow(<TaskShowView {...props} task={task} />);

  expect(component.type()).not.toBeNull();
});

it('renders the task title', () => {
  const task = makeTask({title: 'foo title'});

  const component = shallow(<TaskShowView {...props} task={task} />);

  expect(component.find('TaskEditTitleForm')).toExist();
});

it('renders a message about the repeat time when present', () => {
  const task = makeTask({title: 'foo title', repeatSeconds: 3600});

  const component = shallow(<TaskShowView {...props} task={task} />);

  expect(component).toIncludeText('Repeat: every 1 hour');
});

it('renders a message about no repeat time when not present', () => {
  const task = makeTask({title: 'foo title'});

  const component = shallow(<TaskShowView {...props} task={task} />);

  expect(component).toIncludeText('Repeat: never');
});

it('renders a message about the estimate when present', () => {
  const task = makeTask({title: 'foo title', estimateSeconds: 5200});

  const component = shallow(<TaskShowView {...props} task={task} />);

  expect(component).toIncludeText('Estimate: 1 hour, 26 minutes');
});

it('renders a message about no estimate when not present', () => {
  const task = makeTask({title: 'foo title'});

  const component = shallow(<TaskShowView {...props} task={task} />);

  expect(component).toIncludeText('Estimate: none');
});

it('renders a message about the priority when present', () => {
  const task = makeTask({title: 'foo title', priority: 3});

  const component = shallow(<TaskShowView {...props} task={task} />);

  expect(component).toIncludeText('Priority: 3');
});

it('renders a message about no priority when not present', () => {
  const task = makeTask({title: 'foo title'});

  const component = shallow(<TaskShowView {...props} task={task} />);

  expect(component).toIncludeText('Priority: none');
});

it('renders a message about associated tags when present', () => {
  const task = makeTask({title: 'foo title', tagNames: ['foo', 'bar', 'butz']});

  const component = shallow(<TaskShowView {...props} task={task} />);

  expect(component).toIncludeText('Tags: foo, bar, butz');
});

it('renders a message about no tags when not present', () => {
  const task = makeTask({title: 'foo title'});

  const component = shallow(<TaskShowView {...props} task={task} />);

  expect(component).toIncludeText('Tags: none');
});
