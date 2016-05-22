'use strict';

const React = require('react');
const extend = require('lodash').extend;

const NewTaskForm = require('components/tasks/new_task_form');
const TaskFooter = require('components/common/task_footer');
const TaskDisplay = require('components/tasks/task_display');

const TagStore = require('stores/tag_store');
const TaskStore = require('stores/task_store');

const TasksShow = React.createClass({
  propTypes: {
    params: React.PropTypes.object.isRequired
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState() {
    return {
      task: {title: 'Loading...', loadingState: 'loading'},
      disabled: true,
      tags: [],
      postponeSeconds: 300
    };
  },

  componentDidMount() {
    this.loadTags().then(function () {
      TagStore.on('change', this.loadTags);
    }.bind(this));
    this.loadTask().then(function () {
      TaskStore.on('change', this.loadTask);
      this.setTitle();
    }.bind(this));
  },

  componentWillReceiveProps(nextProps) {
    this.loadTask(nextProps.url);
    this.setTitle();
  },

  componentWillUnmount() {
    TagStore.off('change', this.loadTags);
    TaskStore.off('change', this.loadTask);
  },

  storePostponeSeconds(postponeSeconds) {
    this.setState({postponeSeconds});
  },

  loadTags() {
    return TagStore.getAll().then(this.setTags);
  },

  setTags(data) {
    this.setState({tags: data.tags});
  },

  disable() {
    this.setState({disabled: true});
  },

  setTitle() {
    document.title = `Task: ${this.state.task.title}`;
  },

  storeTask(taskId, attrs, opts) {
    const loadingState = opts && opts.loadingState || 'updating';
    const newTask = extend({}, this.state.task, {loadingState});

    this.setState({task: newTask});

    return TaskStore.update(taskId, attrs);
  },

  loadTask() {
    const tagName = this.props.params.slug || '';

    return TagStore.get(tagName).then(this.updateTask);
  },

  updateTask(data) {
    if (data) {
      const task = extend({}, data.task, {loadingState: 'ready'});

      this.setState({task, disabled: false});
    } else {
      this.setState({task: {title: '(no tasks!)'}, disabled: true});
    }
    this.setTitle();
  },

  createTask(attrs) {
    return TaskStore.create(attrs);
  },

  postponeTask(taskId) {
    const attrs = {postpone: this.state.postponeSeconds};

    return this.storeTask(taskId, attrs, {taskStatus: 'postponing'});
  },

  completeTask(taskId) {
    this.storeTask(taskId, {done: true}, {taskStatus: 'marking_done'});
  },

  deleteTask(taskId) {
    TaskStore.destroy(taskId);
  },

  render() {
    return (
      <div>
        <TaskDisplay
          task={this.state.task}
          tags={this.state.tags}
          disable={this.disable}
          loadTask={this.loadTask}
          disabled={this.state.disabled}
          storeTask={this.storeTask}
          storePostponeSeconds={this.storePostponeSeconds}
          postponeSeconds={this.state.postponeSeconds}
          postponeTask={this.postponeTask}
          completeTask={this.completeTask}
          deleteTask={this.deleteTask}
        />
        <NewTaskForm loadTask={this.loadTask} createTask={this.createTask} />

        <hr />
        <TaskFooter />
      </div>
    );
  }
});

module.exports = TasksShow;
