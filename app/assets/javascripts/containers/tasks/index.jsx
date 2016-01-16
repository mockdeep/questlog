'use strict';

var React = require('react');
var update = require('react/lib/update');
var _ = require('lodash');
var HTML5Backend = require('react-dnd-html5-backend');
var DragDropContext = require('react-dnd').DragDropContext;

var TaskStore = require('stores/task_store');
var BulkTaskStore = require('stores/bulk_task_store');

var NewTaskForm = require('components/tasks/_new_task_form');
var TaskRow = require('components/tasks/_task_row');

var isPending = function (task) {
  return task.pending;
};

var TasksIndex = React.createClass({
  getInitialState: function () {
    return {currentTasks: [], pendingTasks: []};
  },

  loadTasks: function () {
    TaskStore.getAll().then(this.setTasks);
  },

  setTasks: function (data) {
    var partitionedTasks = _.partition(data.tasks, isPending);
    this.setState({
      pendingTasks: partitionedTasks[0],
      currentTasks: partitionedTasks[1]
    });
  },

  moveTask: function (id, afterId) {
    var tasks = this.state.currentTasks;

    var task = _.find(tasks, function (t) { return t.id === id; });
    var afterTask = _.find(tasks, function (t) { return t.id === afterId; });
    var taskIndex = tasks.indexOf(task);
    var afterIndex = tasks.indexOf(afterTask);

    var newTasks = update(tasks, {
      $splice: [
        [taskIndex, 1],
        [afterIndex, 0, task]
      ]
    });

    this.setState({currentTasks: newTasks});
  },

  saveTaskPositions: function (component) {
    var taskId = component.props.task.id;
    var tasks = this.state.currentTasks;

    var task = _.find(tasks, function (t) { return t.id === taskId; });
    var taskIndex = tasks.indexOf(task);
    var afterTask = tasks[taskIndex + 1];
    var beforeTask = tasks[taskIndex - 1];
    var newPriority = task.priority;

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
    component.updatePriority({target: { value: newPriority }});
  },

  currentTaskPositions: function () {
    return _.map(this.state.currentTasks, function (task) {
      return task.id;
    });
  },

  currentTaskRows: function () {
    return _.map(this.state.currentTasks, this.taskRow);
  },

  pendingTaskRows: function () {
    return _.map(this.state.pendingTasks, this.taskRow);
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

  componentDidMount: function () {
    TaskStore.on('change', this.loadTasks);
    this.loadTasks();
  },

  componentWillUnmount: function () {
    TaskStore.off('change', this.loadTasks);
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
          <h2>Current Tasks</h2>
          <ul>
            {this.currentTaskRows()}
          </ul>
        </div>

        <div id='pending-tasks'>
          <h2>Pending Tasks</h2>
          <ul>
            {this.pendingTaskRows()}
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = DragDropContext(HTML5Backend)(TasksIndex);
