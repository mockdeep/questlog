'use strict';

const React = require('react');

const DeleteButton = React.createClass({
  propTypes: {
    deleteTask: React.PropTypes.func.isRequired,
    task: React.PropTypes.object.isRequired
  },

  deleteTask: function (event) {
    event.stopPropagation();
    // eslint-disable-next-line no-alert
    if (confirm('Delete this task?')) {
      this.props.deleteTask(this.props.task.id);
    }
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
