'use strict';

const React = require('react');
const update = require('react/lib/update');
const partition = require('lodash').partition;
const HTML5Backend = require('react-dnd-html5-backend');
const dragDropContext = require('react-dnd').DragDropContext;

const TaskStore = require('stores/task_store');
const BulkTaskStore = require('stores/bulk_task_store');

const NewTaskForm = require('components/tasks/new_task_form');
const TaskRow = require('components/tasks/task_row');

const isPending = function (task) {
  return task.pending;
};

const findTask = function (tasks, taskId) {
  return tasks.find(function (task) { return task.id === taskId; });
};

const TasksIndex = React.createClass({
  getInitialState: function () {
    return {currentTasks: [], pendingTasks: []};
  },

  componentDidMount: function () {
    TaskStore.on('change', this.loadTasks);
    this.loadTasks();
  },

  componentWillUnmount: function () {
    TaskStore.off('change', this.loadTasks);
  },

  loadTasks: function () {
    TaskStore.getAll().then(this.setTasks);
  },

  setTasks: function (data) {
    const partitionedTasks = partition(data.tasks, isPending);

    this.setState({
      pendingTasks: partitionedTasks[0],
      currentTasks: partitionedTasks[1]
    });
  },

  moveTask: function (id, afterId) {
    const tasks = this.state.currentTasks;

    const task = findTask(tasks, id);
    const afterTask = findTask(tasks, afterId);
    const taskIndex = tasks.indexOf(task);
    const afterIndex = tasks.indexOf(afterTask);

    const newTasks = update(tasks, {
      $splice: [
        [taskIndex, 1],
        [afterIndex, 0, task]
      ]
    });

    this.setState({currentTasks: newTasks});
  },

  saveTaskPositions: function (component) {
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
    } else if (afterTask && (afterTask.priority && afterTask.priority < task.priority || !task.priority)) {
      newPriority = afterTask.priority;
    } else if (beforeTask && (task.priority && beforeTask.priority > task.priority || !beforeTask.priority)) {
      newPriority = beforeTask.priority;
    }

    BulkTaskStore.update({positions: this.currentTaskPositions()});
    component.updatePriority({target: {value: newPriority}});
  },

  currentTaskPositions: function () {
    return this.state.currentTasks.map(function (task) {
      return task.id;
    });
  },

  currentTaskRows: function () {
    return this.state.currentTasks.map(this.taskRow);
  },

  pendingTaskRows: function () {
    return this.state.pendingTasks.map(this.taskRow);
  },

  storeTask: function (taskId, attrs) {
    return TaskStore.update(taskId, attrs);
  },

  destroyTask: function (taskId) {
    TaskStore.destroy(taskId);
  },

  taskRow: function (task) {
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

  createTask: function (attrs) {
    return TaskStore.create(attrs);
  },

  render: function () {
    return (
      <div>
        <NewTaskForm loadTask={this.loadTasks} createTask={this.createTask} />
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
  }
});

module.exports = dragDropContext(HTML5Backend)(TasksIndex);
