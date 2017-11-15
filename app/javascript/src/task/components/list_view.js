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
    const tasks = this.state.currentTasks;

    const task = findTask(tasks, id);
    const afterTask = findTask(tasks, afterId);
    const taskIndex = tasks.indexOf(task);
    const afterIndex = tasks.indexOf(afterTask);

    const newTasks = update(
      tasks,
      {$splice: [[taskIndex, 1], [afterIndex, 0, task]]}
    );

    this.setState({currentTasks: newTasks});
  }

  saveTaskPositions(component) {
    const taskId = component.props.task.id;
    const tasks = this.state.currentTasks;

    const task = findTask(tasks, taskId);
    const taskIndex = tasks.indexOf(task);
    const afterTask = tasks[taskIndex + 1];
    const beforeTask = tasks[taskIndex - 1];
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
    return this.state.currentTasks.map(function taskId(task) {
      return task.id;
    });
  }

  currentTaskRows() {
    return this.state.currentTasks.map(this.taskRow);
  }

  pendingTaskRows() {
    return this.state.pendingTasks.map(this.taskRow);
  }

  taskRow(task) {
    return (
      <DraggableTaskRow
        key={task.id}
        task={task}
        moveTask={this.moveTask}
        saveTaskPositions={this.saveTaskPositions}
        updateTask={this.props.updateTask}
        deleteTask={this.props.deleteTask}
      />
    );
  }

  render() {
    return (
      <div>
        <NewTaskForm />
        <br />
        <div id='current-tasks'>
          <table className='task-list'>
            <thead><TableHeaders label={'Current'} /></thead>
            <tbody>{this.currentTaskRows()}</tbody>
          </table>
        </div>

        <div id='pending-tasks'>
          <table className='task-list'>
            <thead><TableHeaders label={'Pending'} /></thead>
            <tbody>{this.pendingTaskRows()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

TaskListView.propTypes = {
  deleteTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
};

export default dragDropContext(HTML5Backend)(TaskListView);
