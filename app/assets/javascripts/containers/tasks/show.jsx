'use strict';

var React = require('react');
var _ = require('lodash');

var NewTaskForm = require('components/tasks/_new_task_form');
var TaskFooter = require('components/common/_task_footer');
var TaskDisplay = require('components/tasks/_task_display');

var TagStore = require('stores/tag_store');
var TaskStore = require('stores/task_store');

var TasksShow = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function () {
    return {
      task: {title: 'Loading...', loadingState: 'loading'},
      disabled: true, tags: [],
      postponeSeconds: 300
    };
  },

  loadTask: function (url) {
    var tagName = this.props.params.slug || '';
    return TagStore.get(tagName).then(this.updateTask);
  },

  updateTask: function (data) {
    if (data) {
      var task = _.extend({}, data.task, {loadingState: 'ready'});
      this.setState({task: task, disabled: false});
    } else {
      this.setState({task: {title: '(no tasks!)'}, disabled: true});
    }
    this.setTitle();
  },

  storePostponeSeconds: function (postponeSeconds) {
    this.setState({postponeSeconds: postponeSeconds});
  },

  loadTags: function () {
    return TagStore.getAll().then(this.setTags);
  },

  setTags: function (data) {
    this.setState({tags: data.tags});
  },

  disable: function () {
    this.setState({disabled: true});
  },

  setTitle: function () {
    document.title = 'Task: ' + this.state.task.title;
  },

  storeTask: function (taskId, attrs, opts) {
    var loadingState = opts && opts.loadingState || 'updating';
    var newTask = _.extend({}, this.state.task, {loadingState: loadingState});
    this.setState({task: newTask});
    return TaskStore.update(taskId, attrs);
  },

  componentDidMount: function () {
    this.loadTags().then(function () {
      TagStore.on('change', this.loadTags);
    }.bind(this));
    this.loadTask().then(function () {
      TaskStore.on('change', this.loadTask);
      this.setTitle();
    }.bind(this));
  },

  componentWillUnmount: function () {
    TagStore.off('change', this.loadTags);
    TaskStore.off('change', this.loadTask);
  },

  componentWillReceiveProps: function (nextProps) {
    this.loadTask(nextProps.url);
    this.setTitle();
  },

  createTask: function (attrs) {
    return TaskStore.create(attrs);
  },

  postponeTask: function (taskId) {
    var attrs = {postpone: this.state.postponeSeconds};
    return this.storeTask(taskId, attrs);
  },

  completeTask: function (taskId) {
    this.storeTask(taskId, {done: true}, {taskStatus: 'marking_done'});
  },

  deleteTask: function (taskId) {
    TaskStore.destroy(taskId);
  },

  render: function () {
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
