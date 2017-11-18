import React from 'react';
import {shallow} from 'enzyme';

import TaskShowView from 'src/task/components/show_view';

const props = {
  deleteTask: jest.fn(),
  updateTask: jest.fn(),
  updateTaskMeta: jest.fn(),
};

it('renders nothing when the task is not present', () => {
  const component = shallow(<TaskShowView {...props} />);

  expect(component.type()).toBeNull();
});

it('sets the parent task id in scratch space', () => {
  const task = {id: 52, title: 'foo title', tagNames: [], subTasks: []};

  shallow(<TaskShowView {...props} task={task} />);

  const expected = {newTask: {parentTaskId: 52, title: ''}};
  expect(props.updateTaskMeta).toHaveBeenCalledWith(expected);
});

it('updates the parent task id in scratch space when component updates', () => {
  const task = {id: 52, title: 'foo title', tagNames: [], subTasks: []};

  const component = shallow(<TaskShowView {...props} task={task} />);

  component.setProps({task: {...task, id: 501}});

  const expected = {newTask: {parentTaskId: 501, title: ''}};
  expect(props.updateTaskMeta).toHaveBeenCalledWith(expected);
});

it('renders something when the task is present', () => {
  const task = {title: 'foo title', tagNames: [], subTasks: []};

  const component = shallow(<TaskShowView {...props} task={task} />);

  expect(component.type()).not.toBeNull();
});

it('renders the task title', () => {
  const task = {title: 'foo title', tagNames: [], subTasks: []};

  const component = shallow(<TaskShowView {...props} task={task} />);

  expect(component.find('h2')).toHaveText('foo title');
});

it('renders a message about the repeat time when present', () => {
  const task = {title: 'foo title', repeatSeconds: 3600, tagNames: [], subTasks: []};

  const component = shallow(<TaskShowView {...props} task={task} />);

  expect(component).toIncludeText('Repeat: every 1 hour');
});

it('renders a message about no repeat time when not present', () => {
  const task = {title: 'foo title', tagNames: [], subTasks: []};

  const component = shallow(<TaskShowView {...props} task={task} />);

  expect(component).toIncludeText('Repeat: never');
});

it('renders a message about the estimate when present', () => {
  const task = {title: 'foo title', estimateSeconds: 5200, tagNames: [], subTasks: []};

  const component = shallow(<TaskShowView {...props} task={task} />);

  expect(component).toIncludeText('Estimate: 1 hour, 26 minutes');
});

it('renders a message about no estimate when not present', () => {
  const task = {title: 'foo title', tagNames: [], subTasks: []};

  const component = shallow(<TaskShowView {...props} task={task} />);

  expect(component).toIncludeText('Estimate: none');
});

it('renders a message about the priority when present', () => {
  const task = {title: 'foo title', priority: 3, tagNames: [], subTasks: []};

  const component = shallow(<TaskShowView {...props} task={task} />);

  expect(component).toIncludeText('Priority: 3');
});

it('renders a message about no priority when not present', () => {
  const task = {title: 'foo title', tagNames: [], subTasks: []};

  const component = shallow(<TaskShowView {...props} task={task} />);

  expect(component).toIncludeText('Priority: none');
});

it('renders a message about associated tags when present', () => {
  const task = {title: 'foo title', tagNames: ['foo', 'bar', 'butz'], subTasks: []};

  const component = shallow(<TaskShowView {...props} task={task} />);

  expect(component).toIncludeText('Tags: foo, bar, butz');
});

it('renders a message about no tags when not present', () => {
  const task = {title: 'foo title', tagNames: [], subTasks: []};

  const component = shallow(<TaskShowView {...props} task={task} />);

  expect(component).toIncludeText('Tags: none');
});
