'use strict';

const React = require('react');
const update = require('react/lib/update');
const partition = require('lodash').partition;
const HTML5Backend = require('react-dnd-html5-backend');
const dragDropContext = require('react-dnd').DragDropContext;

const TaskStore = require('task/store');
const BulkTaskStore = require('task/bulk_store');

const NewTaskForm = require('task/components/new_task_form');
const TaskRow = require('task/components/task_row');

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
    TaskStore.on('change', this.loadTasks);
    this.loadTasks();
  },

  componentWillUnmount() {
    TaskStore.off('change', this.loadTasks);
  },

  loadTasks() {
    TaskStore.getAll().then(this.setTasks);
  },

  setTasks(data) {
    const partitionedTasks = partition(data.tasks, isPending);

    this.setState({
      pendingTasks: partitionedTasks[0],
      currentTasks: partitionedTasks[1]
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
        [afterIndex, 0, task]
      ]
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
    } else if (afterTask && (afterTask.priority && afterTask.priority < task.priority || !task.priority)) {
      newPriority = afterTask.priority;
    } else if (beforeTask && (task.priority && beforeTask.priority > task.priority || !beforeTask.priority)) {
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

  createTask(attrs) {
    return TaskStore.create(attrs);
  },

  render() {
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

module.exports = dragDropContext(HTML5Backend)(TaskList);
