import autobind from "class-autobind";
import {Component} from "react";
import type {ReactElement} from "react";

type Props = {
  completeTask: (taskId: number) => void,
  task: Task,
};

class DoneButton extends Component<Props, never> {
  constructor(props: Props) {
    super(props);
    autobind(this);
  }

  markDone(): void {
    if (!this.isTaskReady()) { return; }

    const {completeTask, task} = this.props;

    completeTask(task.id);
  }

  isTaskReady(): boolean {
    const {task} = this.props;

    return task.loadingState === "ready";
  }

  buttonMessage(): string {
    const {task} = this.props;
    const isMarkingDone = task.loadingState === "marking_done";

    return isMarkingDone ? "Marking done..." : "Done! Give me another!";
  }

  render(): ReactElement {
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
