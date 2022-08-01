import autobind from 'class-autobind';
import type {MouseEvent, ReactElement} from 'react';
import React from 'react';

type Props = {
  deleteTask: (taskId: number) => void,
  task: Task,
};

class DeleteButton extends React.Component<Props, never> {
  constructor(props: Props) {
    super(props);
    autobind(this);
  }

  deleteTask(event: MouseEvent): void {
    event.stopPropagation();

    const {deleteTask, task} = this.props;

    // eslint-disable-next-line no-alert
    if (confirm('Delete this task?')) { deleteTask(task.id); }
  }

  rootOpts() {
    return {
      className: 'fas fa-times delete-button',
      title: 'delete task',
      onClick: this.deleteTask,
    };
  }

  render(): ReactElement {
    return <i {...this.rootOpts()} />;
  }
}

export default DeleteButton;
