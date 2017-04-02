import React from 'react';
import update from 'react/lib/update';
import {partition} from 'lodash';
import HTML5Backend from 'react-dnd-html5-backend';
import {DragDropContext as dragDropContext} from 'react-dnd';

import TaskStore from 'js/task/store';
import BulkTaskStore from 'js/task/bulk_store';

import NewTaskForm from 'js/task/containers/new_task_form';
import TaskRow from 'js/task/components/task_row';

function isPending(task) {
  return task.pending;
}

function findTask(tasks, taskId) {
  return tasks.find(function taskMatches(task) { return task.id === taskId; });
}

const TaskList = React.createClass({
  getInitialState() {
    return {currentTasks: [], pendingTasks: []};
  },

  componentDidMount() {
    this.unsubscribeTasks = TaskStore.subscribe(this.loadTasks);
    this.loadTasks();
  },

  componentWillUnmount() {
    this.unsubscribeTasks();
  },

  loadTasks() {
    if (!TaskStore.getState().loaded) {
      TaskStore.dispatch({type: 'tasks/FETCH'});
    }

    this.setTasks(TaskStore.getState());
  },

  setTasks(data) {
    const partitionedTasks = partition(data.tasks, isPending);

    this.setState({
      pendingTasks: partitionedTasks[0],
      currentTasks: partitionedTasks[1],
    });
  },

  moveTask(id, afterId) {
    const tasks = this.state.currentTasks;

    const task = findTask(tasks, id);
    const afterTask = findTask(tasks, afterId);
    const taskIndex = tasks.indexOf(task);
    const afterIndex = tasks.indexOf(afterTask);

    const newTasks = update(tasks, {
      $splice: [
        [taskIndex, 1],
        [afterIndex, 0, task],
      ],
    });

    this.setState({currentTasks: newTasks});
  },

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
  },

  currentTaskPositions() {
    return this.state.currentTasks.map(function taskId(task) {
      return task.id;
    });
  },

  currentTaskRows() {
    return this.state.currentTasks.map(this.taskRow);
  },

  pendingTaskRows() {
    return this.state.pendingTasks.map(this.taskRow);
  },

  storeTask(taskId, attrs) {
    return TaskStore.update(taskId, attrs);
  },

  destroyTask(taskId) {
    TaskStore.destroy(taskId);
  },

  taskRow(task) {
    return (
      <TaskRow
        key={task.id}
        task={task}
        moveTask={this.moveTask}
        saveTaskPositions={this.saveTaskPositions}
        storeTask={this.storeTask}
        destroyTask={this.destroyTask}
      />
    );
  },

  render() {
    return (
      <div>
        <NewTaskForm />
        <br />
        <div id='current-tasks'>
          <h2>{'Current Tasks'}</h2>
          <ul>
            {this.currentTaskRows()}
          </ul>
        </div>

        <div id='pending-tasks'>
          <h2>{'Pending Tasks'}</h2>
          <ul>
            {this.pendingTaskRows()}
          </ul>
        </div>
      </div>
    );
  },
});

export default dragDropContext(HTML5Backend)(TaskList);
