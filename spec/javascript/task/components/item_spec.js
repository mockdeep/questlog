jest.mock('src/_helpers/request', () => {
  const fakePromise = {then: jest.fn(() => fakePromise)};

  return () => fakePromise;
});

import React from 'react';
import {shallow} from 'enzyme';

import Item from 'src/task/components/item';

const props = {
  ajaxState: 'ready',
  deleteTask: jest.fn(),
  scratch: {postponeSeconds: 250},
  tags: [],
  updateScratch: jest.fn(),
  updateTask: jest.fn(),
};

it('updates the task on postpone', () => {
  const component = shallow(<Item {...props} />);
  const taskDisplay = component.find('TaskDisplay');

  taskDisplay.prop('postponeTask')(52);

  expect(props.updateTask).toHaveBeenCalledWith(52, {postpone: 250});
});

it('updates the task on completion', () => {
  const component = shallow(<Item {...props} />);
  const taskDisplay = component.find('TaskDisplay');

  taskDisplay.prop('completeTask')(512);

  expect(props.updateTask).toHaveBeenCalledWith(512, {done: true});
});

describe('when a task is given', () => {
  it('sets the document title to the task title', () => {
    const task = {title: 'some task title'};

    shallow(<Item {...props} task={task} />);

    expect(document.title).toBe('Task: some task title');
  });
});

describe('when no task is given', () => {
  it('sets the document title to "(no tasks!)" when state is "ready"', () => {
    shallow(<Item {...props} />);

    expect(document.title).toBe('Task: (no tasks!)');
  });

  it('sets the document title to "Loading..." when state is "fetching"', () => {
    shallow(<Item {...props} ajaxState='fetching' />);

    expect(document.title).toBe('Task: Loading...');
  });

  it('disables the task display', () => {
    const component = shallow(<Item {...props} />);
    const taskDisplay = component.find('TaskDisplay');

    expect(taskDisplay).toHaveProp('disabled', true);
  });

  it('throws an error when state is not accounted for', () => {
    expect(() => {
      shallow(<Item {...props} ajaxState='froggling' />);
    }).toThrow(/don't know how to deal with ajaxState "froggling"/);
  });
});
