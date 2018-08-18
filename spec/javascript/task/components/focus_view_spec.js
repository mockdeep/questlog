jest.mock('src/_helpers/request', () => {
  const fakePromise = {then: jest.fn(() => fakePromise)};

  return () => fakePromise;
});

import React from 'react';
import {shallow} from 'enzyme';

import TaskFocusView from 'src/task/components/focus_view';

import {makeTask} from '_test_helpers/factories';

const updateScratch = jest.fn();
const updateTask = jest.fn();
const props = {
  ajaxState: 'ready',
  deleteTask: jest.fn(),
  scratch: {postponeSeconds: 250},
  tags: [],
  updateScratch,
  updateTask,
};

it('updates the task on postpone', () => {
  const component = shallow(<TaskFocusView {...props} task={{}} />);
  const taskDisplay = component.find('TaskDisplay');

  taskDisplay.prop('postponeTask')(52);

  expect(updateTask).toHaveBeenCalledWith(52, {postpone: 250});
});

it('updates the postponeSeconds in scratch', () => {
  const component = shallow(<TaskFocusView {...props} task={{}} />);
  const taskDisplay = component.find('TaskDisplay');

  taskDisplay.prop('storePostponeSeconds')(52);

  expect(updateScratch).toHaveBeenCalledWith({postponeSeconds: 52});
});

it('updates the task on completion', () => {
  const component = shallow(<TaskFocusView {...props} task={{}} />);
  const taskDisplay = component.find('TaskDisplay');

  taskDisplay.prop('completeTask')(512);

  expect(updateTask).toHaveBeenCalledWith(512, {done: true});
});

describe('when a task is given', () => {
  it('sets the document title to the task title', () => {
    const task = makeTask({title: 'some task title'});

    shallow(<TaskFocusView {...props} task={task} />);

    expect(document.title).toBe('some task title');
  });
});

describe('when no task is given and ajaxState is pending', () => {
  it('sets the document title to "Loading..."', () => {
    shallow(<TaskFocusView {...props} ajaxState='fetching' />);

    expect(document.title).toBe('Loading...');
  });

  it('renders a loading message', () => {
    const overrides = {...props, ajaxState: 'fetching'};
    const component = shallow(<TaskFocusView {...overrides} />);

    expect(component).toIncludeText('Loading...');
  });
});

describe('when no task is given and ajaxState is ready', () => {
  it('sets the document title to "(no tasks!)"', () => {
    shallow(<TaskFocusView {...props} />);

    expect(document.title).toBe('(no tasks!)');
  });

  it('renders a no tasks message', () => {
    const component = shallow(<TaskFocusView {...props} />);

    expect(component).toIncludeText('No tasks!');
  });
});

it('throws an error when ajaxState is not accounted for', () => {
  expect(() => {
    shallow(<TaskFocusView {...props} ajaxState='froggling' />);
  }).toThrow(/don't know how to deal with ajaxState "froggling"/u);
});
