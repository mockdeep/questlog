import React from 'react';
import {shallow} from 'enzyme';

import TaskShowView from 'src/task/components/show_view';

import {makeTask} from '_test_helpers/factories';

const updateTaskMeta = jest.fn();
const props = {
  deleteTask: jest.fn(),
  updateTask: jest.fn(),
  updateTaskMeta,
  subTasks: [],
};

it('renders nothing when the task is not present', () => {
  const component = shallow(<TaskShowView {...props} />);

  expect(component.type()).toBeNull();
});

it('sets the task in scratch space', () => {
  const task = makeTask({title: 'foo title'});

  shallow(<TaskShowView {...props} task={task} />);

  const [[payload]] = updateTaskMeta.mock.calls;
  const {newTask} = payload;

  expect(newTask.priority).toBeNull();
  expect(newTask.repeatSeconds).toBeUndefined();
  expect(newTask.releaseAt).toBeUndefined();
  expect(newTask.tagNames).toEqual([]);
  expect(newTask.timeframe).toBeNull();
  expect(newTask.parentTaskId).toBe(task.id);
  expect(newTask.title).toBe('');
});

it('updates the task in scratch space when component updates', () => {
  const task = makeTask({title: 'foo title'});
  const component = shallow(<TaskShowView {...props} task={task} />);

  component.setProps({task: {...task, id: 501}});

  expect(updateTaskMeta.mock.calls[1][0].newTask.parentTaskId).toBe(501);
});

it('clears the scratch space when component unmounts', () => {
  const task = makeTask({title: 'foo title'});
  const component = shallow(<TaskShowView {...props} task={task} />);

  component.unmount();

  expect(updateTaskMeta).toHaveBeenLastCalledWith({newTask: {title: ''}});
});

it('renders something when the task is present', () => {
  const task = makeTask({title: 'foo title'});

  const component = shallow(<TaskShowView {...props} task={task} />);

  expect(component.type()).not.toBeNull();
});

it('renders the task title', () => {
  const task = makeTask({title: 'foo title'});

  const component = shallow(<TaskShowView {...props} task={task} />);

  expect(component.find('Connect(Scratch(TaskEditTitleForm))')).toBePresent();
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
