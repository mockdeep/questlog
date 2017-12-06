import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React from 'react';

import {taskShape} from 'src/shapes';

class DoneButton extends React.Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  markDone() {
    if (!this.isTaskReady()) { return; }
    this.props.completeTask(this.props.task.id);
  }

  isTaskReady() {
    return this.props.task.loadingState === 'ready';
  }

  buttonMessage() {
    const isMarkingDone = this.props.task.loadingState === 'marking_done';

    return isMarkingDone ? 'Marking done...' : 'Done! Give me another!';
  }

  render() {
    return (
      <input
        type='button'
        disabled={!this.isTaskReady()}
        className='btn btn-primary btn-lg btn-block'
        onClick={this.markDone}
        value={this.buttonMessage()}
      />
    );
  }
}

DoneButton.propTypes = {
  completeTask: PropTypes.func.isRequired,
  task: taskShape.isRequired,
};

export default DoneButton;
