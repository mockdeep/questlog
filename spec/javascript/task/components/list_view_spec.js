jest.mock('src/task/bulk_store');

import React from 'react';
import {shallow} from 'enzyme';

import BulkTaskStore from 'src/task/bulk_store';
import TaskListView from 'src/task/components/list_view';

import {makeTask} from '_test_helpers/factories';

const props = {
  currentTasks: [],
  deleteTask: jest.fn(),
  pendingTasks: [],
  route: {name: 'tasks'},
  updateTask: jest.fn(),
};

const DraggableTaskRow = 'DropTarget(DragSource(DraggableTaskRow))';

function dive(component) {
  return shallow(component).dive();
}

it('renders the list filters', () => {
  const component = dive(<TaskListView {...props} />);

  expect(component.find('TaskListFilters')).toExist();
});

it('renders current tasks', () => {
  const overrides = {currentTasks: [{id: 1}]};

  const component = dive(<TaskListView {...props} {...overrides} />);

  expect(component.find(DraggableTaskRow)).toHaveLength(1);
  const tableHeaders = component.find('TableHeaders');
  expect(tableHeaders).toHaveLength(1);
  expect(tableHeaders).toHaveProp('label', 'Current tasks');
});

it('does not render a current tasks table when none are present', () => {
  const component = dive(<TaskListView {...props} />);

  expect(component.find(DraggableTaskRow)).toHaveLength(0);
  expect(component.find('TableHeaders')).toHaveLength(0);
});

it('renders pending tasks', () => {
  const overrides = {pendingTasks: [{id: 1}]};

  const component = dive(<TaskListView {...props} {...overrides} />);

  expect(component.find(DraggableTaskRow)).toHaveLength(1);
  const tableHeaders = component.find('TableHeaders');
  expect(tableHeaders).toHaveLength(1);
  expect(tableHeaders).toHaveProp('label', 'Pending tasks');
});

it('does not render a pending tasks table when none are present', () => {
  const component = dive(<TaskListView {...props} />);

  expect(component.find(DraggableTaskRow)).toHaveLength(0);
  expect(component.find('TableHeaders')).toHaveLength(0);
});

it('updates task rows based on updated props', () => {
  const overrides = {currentTasks: [{id: 1}]};

  const component = dive(<TaskListView {...props} {...overrides} />);
  component.setProps({currentTasks: [], pendingTasks: [{id: 1}]});

  expect(component.find(DraggableTaskRow)).toHaveLength(1);
  const tableHeaders = component.find('TableHeaders');
  expect(tableHeaders).toHaveLength(1);
  expect(tableHeaders).toHaveProp('label', 'Pending tasks');
});

describe('moving a task when dragging', () => {
  it('moves a task after another task', () => {
    const overrides = {currentTasks: [{id: 1}, {id: 52}]};
    const component = dive(<TaskListView {...props} {...overrides} />);
    let taskRows = component.find(DraggableTaskRow);
    expect(taskRows).toHaveLength(2);
    expect(taskRows.at(0)).toHaveProp('task', overrides.currentTasks[0]);
    expect(taskRows.at(1)).toHaveProp('task', overrides.currentTasks[1]);

    taskRows.at(0).prop('moveTask')(1, 52);
    component.update();

    taskRows = component.find(DraggableTaskRow);
    expect(taskRows).toHaveLength(2);
    expect(taskRows.at(0)).toHaveProp('task', overrides.currentTasks[1]);
    expect(taskRows.at(1)).toHaveProp('task', overrides.currentTasks[0]);
  });

  it('does nothing when moving task id is the same as after task id', () => {
    const overrides = {currentTasks: [{id: 1}, {id: 52}]};
    const component = dive(<TaskListView {...props} {...overrides} />);
    let taskRows = component.find(DraggableTaskRow);
    expect(taskRows).toHaveLength(2);
    expect(taskRows.at(0)).toHaveProp('task', overrides.currentTasks[0]);
    expect(taskRows.at(1)).toHaveProp('task', overrides.currentTasks[1]);

    taskRows.at(0).prop('moveTask')(1, 1);
    component.update();

    taskRows = component.find(DraggableTaskRow);
    expect(taskRows).toHaveLength(2);
    expect(taskRows.at(0)).toHaveProp('task', overrides.currentTasks[0]);
    expect(taskRows.at(1)).toHaveProp('task', overrides.currentTasks[1]);
  });
});

describe('saving task after drop', () => {
  it('sets null task priority to match below task when moved to top', () => {
    const task1 = makeTask({priority: 2});
    const task2 = makeTask({priority: 3});
    const task3 = makeTask({priority: null});
    const overrides = {currentTasks: [task3, task1, task2]};
    const component = dive(<TaskListView {...props} {...overrides} />);
    const updatePriority = jest.fn();
    const fakeComponent = {props: {task: task3}, updatePriority};

    component.instance().saveTaskPositions(fakeComponent);

    expect(updatePriority).toHaveBeenCalledWith({target: {value: 2}});
  });

  it('sets task priority to match below task when moved to top', () => {
    const task1 = makeTask({priority: 2});
    const task2 = makeTask({priority: 3});
    const task3 = makeTask({priority: 3});
    const overrides = {currentTasks: [task3, task1, task2]};
    const component = dive(<TaskListView {...props} {...overrides} />);
    const updatePriority = jest.fn();
    const fakeComponent = {props: {task: task3}, updatePriority};

    component.instance().saveTaskPositions(fakeComponent);

    expect(updatePriority).toHaveBeenCalledWith({target: {value: 2}});
  });

  it('sets task priority to match above task when moved to bottom', () => {
    const task1 = makeTask({priority: 2});
    const task2 = makeTask({priority: 3});
    const task3 = makeTask({priority: 3});
    const overrides = {currentTasks: [task2, task3, task1]};
    const component = dive(<TaskListView {...props} {...overrides} />);
    const updatePriority = jest.fn();
    const fakeComponent = {props: {task: task1}, updatePriority};

    component.instance().saveTaskPositions(fakeComponent);

    expect(updatePriority).toHaveBeenCalledWith({target: {value: 3}});
  });

  it('sets task priority to null when above task has null priority', () => {
    const task1 = makeTask({priority: 2});
    const task2 = makeTask({priority: 3});
    const task3 = makeTask({priority: null});
    const overrides = {currentTasks: [task2, task3, task1]};
    const component = dive(<TaskListView {...props} {...overrides} />);
    const updatePriority = jest.fn();
    const fakeComponent = {props: {task: task1}, updatePriority};

    component.instance().saveTaskPositions(fakeComponent);

    expect(updatePriority).toHaveBeenCalledWith({target: {value: null}});
  });

  it('keeps task priority at null when moved to bottom', () => {
    const task1 = makeTask({priority: 2});
    const task2 = makeTask({priority: null});
    const task3 = makeTask({priority: 3});
    const overrides = {currentTasks: [task1, task3, task2]};
    const component = dive(<TaskListView {...props} {...overrides} />);
    const updatePriority = jest.fn();
    const fakeComponent = {props: {task: task2}, updatePriority};

    component.instance().saveTaskPositions(fakeComponent);

    expect(updatePriority).toHaveBeenCalledWith({target: {value: null}});
  });

  it('keeps task priority when below task matches but not above', () => {
    const task1 = makeTask({priority: 2});
    const task2 = makeTask({priority: 3});
    const task3 = makeTask({priority: 3});
    const overrides = {currentTasks: [task1, task3, task2]};
    const component = dive(<TaskListView {...props} {...overrides} />);
    const updatePriority = jest.fn();
    const fakeComponent = {props: {task: task3}, updatePriority};

    component.instance().saveTaskPositions(fakeComponent);

    expect(updatePriority).toHaveBeenCalledWith({target: {value: 3}});
  });

  it('keeps task priority when above task matches but not below', () => {
    const task1 = makeTask({priority: 2});
    const task2 = makeTask({priority: 2});
    const task3 = makeTask({priority: 3});
    const overrides = {currentTasks: [task2, task1, task3]};
    const component = dive(<TaskListView {...props} {...overrides} />);
    const updatePriority = jest.fn();
    const fakeComponent = {props: {task: task1}, updatePriority};

    component.instance().saveTaskPositions(fakeComponent);

    expect(updatePriority).toHaveBeenCalledWith({target: {value: 2}});
  });

  it('sets task priority to below task priority when neither match', () => {
    const task1 = makeTask({priority: 1});
    const task2 = makeTask({priority: 2});
    const task3 = makeTask({priority: 3});
    const overrides = {currentTasks: [task2, task1, task3]};
    const component = dive(<TaskListView {...props} {...overrides} />);
    const updatePriority = jest.fn();
    const fakeComponent = {props: {task: task1}, updatePriority};

    component.instance().saveTaskPositions(fakeComponent);

    expect(updatePriority).toHaveBeenCalledWith({target: {value: 3}});
  });

  it('updates the tasks on the server', () => {
    const task1 = makeTask({priority: 1});
    const task2 = makeTask({priority: 2});
    const task3 = makeTask({priority: 3});
    const overrides = {currentTasks: [task2, task1, task3]};
    const component = dive(<TaskListView {...props} {...overrides} />);
    const fakeComponent = {props: {task: task1}, updatePriority: jest.fn()};

    component.instance().saveTaskPositions(fakeComponent);

    const expected = {positions: [task2.id, task1.id, task3.id]};
    expect(BulkTaskStore.update).toHaveBeenCalledWith(expected);
  });
});
