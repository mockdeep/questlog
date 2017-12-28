import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React from 'react';
import update from 'immutability-helper';
import {partition} from 'lodash';
import HTML5Backend from 'react-dnd-html5-backend';
import {DragDropContext as dragDropContext} from 'react-dnd';

import TaskStore from 'src/task/store';
import BulkTaskStore from 'src/task/bulk_store';

import NewTaskForm from 'src/task/containers/new_task_form';
import TableHeaders from 'src/task/components/table_headers';
import DraggableTaskRow from 'src/task/components/draggable_task_row';

function isPending(task) {
  return task.pending;
}

function findTask(tasks, taskId) {
  return tasks.find(function taskMatches(task) { return task.id === taskId; });
}

class TaskListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {currentTasks: [], pendingTasks: []};
    autobind(this);
  }

  componentDidMount() {
    this.unsubscribeTasks = TaskStore.subscribe(this.loadTasks);
    this.loadTasks();
  }

  componentWillUnmount() {
    this.unsubscribeTasks();
  }

  loadTasks() {
    if (!TaskStore.getState().loaded) {
      TaskStore.dispatch({type: 'tasks/FETCH'});
    }

    this.setTasks(TaskStore.getState());
  }

  setTasks(data) {
    const [pendingTasks, currentTasks] = partition(data.tasks, isPending);

    this.setState({pendingTasks, currentTasks});
  }

  moveTask(id, afterId) {
    const {currentTasks} = this.state;

    const task = findTask(currentTasks, id);
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

    return currentTasks.map(function taskId(task) {
      return task.id;
    });
  }

  currentTasksTable() {
    const {currentTasks} = this.state;

    if (currentTasks.length === 0) { return null; }

    return (
      <div id='current-tasks'>
        <table className='task-list'>
          <thead>
            <TableHeaders label={'Current tasks'} />
          </thead>
          <tbody>
            {this.currentTaskRows()}
          </tbody>
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
          <thead>
            <TableHeaders label={'Pending tasks'} />
          </thead>
          <tbody>
            {this.pendingTaskRows()}
          </tbody>
        </table>
      </div>
    );
  }

  currentTaskRows() {
    const {currentTasks} = this.state;

    return currentTasks.map(this.taskRow);
  }

  pendingTaskRows() {
    const {pendingTasks} = this.state;

    return pendingTasks.map(this.taskRow);
  }

  taskRow(task) {
    const {deleteTask, updateTask} = this.props;

    return (
      <DraggableTaskRow
        key={task.id}
        task={task}
        moveTask={this.moveTask}
        saveTaskPositions={this.saveTaskPositions}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />
    );
  }

  render() {
    return (
      <div>
        <NewTaskForm />
        <br />
        {this.currentTasksTable()}
        {this.pendingTasksTable()}

      </div>
    );
  }
}

TaskListView.propTypes = {
  deleteTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
};

export default dragDropContext(HTML5Backend)(TaskListView);
