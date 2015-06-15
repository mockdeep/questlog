'use strict';

var React = require('react');

var TaskStore = require('../../stores/task_store');

var DeleteButton = React.createClass({
  deleteTask: function (event) {
    event.stopPropagation();
    if (confirm('Delete this task?')) {
      TaskStore.destroy(this.props.task.id);
    }
  },

  loadTask: function () {
    this.props.loadTask();
  },

  rootOpts: function () {
    return {
      className: 'fa fa-times delete-button',
      title: 'delete task',
      onClick: this.deleteTask
    };
  },

  render: function () {
    return <i {...this.rootOpts()} />;
  }
});

module.exports = DeleteButton;
