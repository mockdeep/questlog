import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React from 'react';
import update from 'immutability-helper';
import HTML5Backend from 'react-dnd-html5-backend';
import {DragDropContext as dragDropContext} from 'react-dnd';

import BulkTaskStore from 'src/task/bulk_store';

import LinkSet from 'src/route/components/link_set';
import NewTaskForm from 'src/task/containers/new_task_form';
import TableHeaders from 'src/task/components/table_headers';
import DraggableTaskRow from 'src/task/components/draggable_task_row';
import {routeShape, taskShape} from 'src/shapes';

const TASK_FILTER_LINKS = [
  {routeName: 'tasks', label: 'ALL'},
  {routeName: 'rootTasks', label: 'ROOT'},
  {routeName: 'leafTasks', label: 'LEAF'},
];

function findTask(tasks, taskId) {
  return tasks.find((task) => task.id === taskId);
}

class TaskListView extends React.Component {
  constructor(props) {
    super(props);

    const {currentTasks, pendingTasks} = this.props;
    this.state = {currentTasks, pendingTasks};
    autobind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {currentTasks, pendingTasks} = nextProps;
    this.setState({currentTasks, pendingTasks});
  }

  moveTask(id, afterId) {
    if (id === afterId) { return; }
    const {currentTasks} = this.state;

    const task = findTask(currentTasks, id);
    // afterTask is the task that comes **before** the task we're moving
    // unless task is moved to the top, in which it is the task **after**
    // somehow this works for both cases...
    const afterTask = findTask(currentTasks, afterId);
    const taskIndex = currentTasks.indexOf(task);
    const afterIndex = currentTasks.indexOf(afterTask);

    const newTasks = update(
      currentTasks,
      {$splice: [[taskIndex, 1], [afterIndex, 0, task]]}
    );

    this.setState({currentTasks: newTasks});
  }

  saveTaskPositions(component) {
    const taskId = component.props.task.id;
    const {currentTasks} = this.state;

    const task = findTask(currentTasks, taskId);
    const taskIndex = currentTasks.indexOf(task);
    // afterTask is the task that comes **after** the task we're moving
    const afterTask = currentTasks[taskIndex + 1];
    const beforeTask = currentTasks[taskIndex - 1];
    let newPriority = task.priority;

    if (beforeTask && afterTask) {
      if (task.priority !== beforeTask.priority && task.priority !== afterTask.priority) {
        newPriority = afterTask.priority;
      }
    } else if (afterTask && ((afterTask.priority && afterTask.priority < task.priority) || !task.priority)) {
      newPriority = afterTask.priority;
    } else if (beforeTask && ((task.priority && beforeTask.priority > task.priority) || !beforeTask.priority)) {
      newPriority = beforeTask.priority;
    }

    BulkTaskStore.update({positions: this.currentTaskPositions()});
    component.updatePriority({target: {value: newPriority}});
  }

  currentTaskPositions() {
    const {currentTasks} = this.state;

    return currentTasks.map((task) => task.id);
  }

  currentTasksTable() {
    const {currentTasks} = this.state;

    if (currentTasks.length === 0) { return null; }

    return (
      <div id='current-tasks'>
        <table className='task-list'>
          <thead><TableHeaders label={'Current tasks'} /></thead>
          <tbody>{this.currentTaskRows()}</tbody>
        </table>
      </div>
    );
  }

  pendingTasksTable() {
    const {pendingTasks} = this.state;

    if (pendingTasks.length === 0) { return null; }

    return (
      <div id='pending-tasks'>
        <table className='task-list'>
          <thead><TableHeaders label={'Pending tasks'} /></thead>
          <tbody>{this.pendingTaskRows()}</tbody>
        </table>
      </div>
    );
  }

  currentTaskRows() {
    const {currentTasks} = this.state;

    return currentTasks.map((task) => this.taskRow(task, {status: 'current'}));
  }

  pendingTaskRows() {
    const {pendingTasks} = this.state;

    return pendingTasks.map((task) => this.taskRow(task, {status: 'pending'}));
  }

  taskRow(task, {status}) {
    const {deleteTask, updateTask} = this.props;

    return (
      <DraggableTaskRow
        key={task.id}
        keyPrefix={`${status}TimeframeSection`}
        task={task}
        moveTask={this.moveTask}
        saveTaskPositions={this.saveTaskPositions}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />
    );
  }

  render() {
    const {route} = this.props;

    return (
      <div>
        <NewTaskForm />
        <br />
        {'Filter: '}
        <LinkSet links={TASK_FILTER_LINKS} route={route} />
        {this.currentTasksTable()}
        {this.pendingTasksTable()}
      </div>
    );
  }
}

TaskListView.propTypes = {
  currentTasks: PropTypes.arrayOf(taskShape).isRequired,
  deleteTask: PropTypes.func.isRequired,
  pendingTasks: PropTypes.arrayOf(taskShape).isRequired,
  route: routeShape.isRequired,
  updateTask: PropTypes.func.isRequired,
};

export default dragDropContext(HTML5Backend)(TaskListView);
