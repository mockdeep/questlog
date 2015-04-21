'use strict';

var helpers = require('../helpers');

var DeleteButton = React.createClass({
  deleteTask: function (event) {
    event.stopPropagation();
    if (confirm('Delete this task?')) {
      helpers.request({
        url: 'tasks/' + this.props.task.id,
        method: 'delete',
        success: this.loadTask
      });
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
