'use strict';

var React = require('react');

var NewTaskForm = require('./_new_task_form');
var TaskFooter = require('../common/_task_footer');
var TaskDisplay = require('./_task_display');

var TagStore = require('../../stores/tag_store');

var TasksShow = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function () {
    return {task: {title: 'Loading...'}, disabled: true, tags: []};
  },

  loadTask: function (url) {
    var tagName = this.context.router.getCurrentParams().slug || '';
    TagStore.get(tagName).then(this.updateTask);
  },

  updateTask: function (data) {
    if (data) {
      this.setState({task: data.task, disabled: false});
    } else {
      this.setState({task: {title: '(no tasks!)'}, disabled: true});
    }
    this.setTitle();
  },

  loadTags: function () {
    this.setState({tags: TagStore.getAll()});
  },

  disable: function () {
    this.setState({disabled: true});
  },

  setTitle: function () {
    document.title = 'Task: ' + this.state.task.title;
  },

  componentDidMount: function () {
    TagStore.on('change', this.loadTags);
    this.loadTags();
    this.loadTask();
    this.setTitle();
  },

  componentWillUnmount: function () {
    TagStore.off('change', this.loadTags);
  },

  componentWillReceiveProps: function (nextProps) {
    this.loadTask(nextProps.url);
    this.setTitle();
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
        />
        <NewTaskForm loadTask={this.loadTask} />

        <hr />
        <TaskFooter />
      </div>
    );
  }
});

module.exports = TasksShow;
