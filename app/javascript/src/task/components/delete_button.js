import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React from 'react';

import {taskShape} from 'src/shapes';

class DeleteButton extends React.Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  deleteTask(event) {
    event.stopPropagation();

    const {deleteTask, task} = this.props;

    // eslint-disable-next-line no-alert
    if (confirm('Delete this task?')) { deleteTask(task.id); }
  }

  rootOpts() {
    return {
      className: 'fa fa-times delete-button',
      title: 'delete task',
      onClick: this.deleteTask,
    };
  }

  render() {
    return <i {...this.rootOpts()} />;
  }
}

DeleteButton.propTypes = {
  deleteTask: PropTypes.func.isRequired,
  task: taskShape.isRequired,
};

export default DeleteButton;
