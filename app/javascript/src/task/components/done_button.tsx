import autobind from 'class-autobind';
import React from 'react';

type Props = {
  completeTask: Function,
  task: Task,
};

class DoneButton extends React.Component<Props, any> {
  constructor(props: Props) {
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

export default DoneButton;
