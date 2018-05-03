import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React from 'react';

import {taskShape} from 'src/shapes';

class DoneButton extends React.Component<any, any> {
  constructor(props) {
    super(props);
    autobind(this);
  }

  markDone() {
    if (!this.isTaskReady()) { return; }

    const {completeTask, task} = this.props;

    completeTask(task.id);
  }

  isTaskReady() {
    const {task} = this.props;

    return task.loadingState === 'ready';
  }

  buttonMessage() {
    const {task} = this.props;
    const isMarkingDone = task.loadingState === 'marking_done';

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
