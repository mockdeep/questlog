jest.mock('src/task/store');

import React from 'react';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';

import createAppStore from 'src/create_app_store';
import TaskListView from 'src/task/components/list_view';

const props = {
  currentTasks: [],
  deleteTask: jest.fn(),
  pendingTasks: [],
  updateTask: jest.fn(),
};

function mountWithProvider(component) {
  const provider = (
    <Provider store={createAppStore()}>
      {component}
    </Provider>
  );

  return mount(provider);
}

it('renders a new task form', () => {
  const component = mountWithProvider(<TaskListView {...props} />);

  expect(component.find('NewTaskForm')).toBePresent();
});

it('renders current tasks', () => {
  const overrides = {currentTasks: [{id: 1}]};

  const component = mountWithProvider(<TaskListView {...props} {...overrides} />);

  expect(component.find('DraggableTaskRow')).toHaveLength(1);
  const tableHeaders = component.find('TableHeaders');
  expect(tableHeaders).toHaveLength(1);
  expect(tableHeaders).toHaveProp('label', 'Current tasks');
});

it('does not render a current tasks table when none are present', () => {
  const component = mountWithProvider(<TaskListView {...props} />);

  expect(component.find('DraggableTaskRow')).toHaveLength(0);
  expect(component.find('TableHeaders')).toHaveLength(0);
});

it('renders pending tasks', () => {
  const overrides = {pendingTasks: [{id: 1}]};

  const component = mountWithProvider(<TaskListView {...props} {...overrides} />);

  expect(component.find('DraggableTaskRow')).toHaveLength(1);
  const tableHeaders = component.find('TableHeaders');
  expect(tableHeaders).toHaveLength(1);
  expect(tableHeaders).toHaveProp('label', 'Pending tasks');
});

it('does not render a pending tasks table when none are present', () => {
  const component = mountWithProvider(<TaskListView {...props} />);

  expect(component.find('DraggableTaskRow')).toHaveLength(0);
  expect(component.find('TableHeaders')).toHaveLength(0);
});
