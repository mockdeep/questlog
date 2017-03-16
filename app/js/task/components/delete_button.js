import React from 'react';

const DeleteButton = React.createClass({
  propTypes: {
    deleteTask: React.PropTypes.func.isRequired,
    task: React.PropTypes.object.isRequired,
  },

  deleteTask(event) {
    event.stopPropagation();
    // eslint-disable-next-line no-alert
    if (confirm('Delete this task?')) {
      this.props.deleteTask(this.props.task.id);
    }
  },

  rootOpts() {
    return {
      className: 'fa fa-times delete-button',
      title: 'delete task',
      onClick: this.deleteTask,
    };
  },

  render() {
    return <i {...this.rootOpts()} />;
  },
});

export default DeleteButton;
