jest.mock('src/_helpers/request', () => {
  const fakePromise = {then: jest.fn(() => fakePromise)};

  return () => fakePromise;
});

import React from 'react';
import {shallow} from 'enzyme';

import Item from 'src/task/components/item';
import TaskDisplay from 'src/task/components/task_display';
import NotificationCheckbox from 'src/notification/containers/checkbox';

const renderOpts = {lifecycleExperimental: true};
const props = {
  ajaxState: 'ready',
  deleteTask: jest.fn(),
  postponeSeconds: 250,
  tags: [],
  updateTagMeta: jest.fn(),
  updateTask: jest.fn(),
  updateTaskMeta: jest.fn(),
};

it('renders the notification checkbox', () => {
  const component = shallow(<Item {...props} />, renderOpts);

  expect(component.find(NotificationCheckbox)).toHaveLength(1);
});

it('updates the task on postpone', () => {
  const component = shallow(<Item {...props} />, renderOpts);
  const taskDisplay = component.find(TaskDisplay);

  taskDisplay.prop('postponeTask')(52);

  expect(props.updateTask).toHaveBeenCalledWith(52, {postpone: 250});
});

it('updates the task on completion', () => {
  const component = shallow(<Item {...props} />, renderOpts);
  const taskDisplay = component.find(TaskDisplay);

  taskDisplay.prop('completeTask')(512);

  expect(props.updateTask).toHaveBeenCalledWith(512, {done: true});
});

describe('when a task is given', () => {
  it('sets the document title to the task title', () => {
    const task = {title: 'some task title'};

    shallow(<Item {...props} task={task} />, renderOpts);

    expect(document.title).toBe('Task: some task title');
  });
});

describe('when no task is given', () => {
  it('sets the document title to "(no tasks!)" when state is "ready"', () => {
    shallow(<Item {...props} />, renderOpts);

    expect(document.title).toBe('Task: (no tasks!)');
  });

  it('sets the document title to "Loading..." when state is "fetching"', () => {
    shallow(<Item {...props} ajaxState='fetching' />, renderOpts);

    expect(document.title).toBe('Task: Loading...');
  });

  it('disables the task display', () => {
    const component = shallow(<Item {...props} />, renderOpts);
    const taskDisplay = component.find(TaskDisplay);

    expect(taskDisplay.prop('disabled')).toBe(true);
  });

  it('throws an error when state is not accounted for', () => {
    expect(() => {
      shallow(<Item {...props} ajaxState='froggling' />, renderOpts);
    }).toThrow(/don't know how to deal with ajaxState "froggling"/);
  });
});
