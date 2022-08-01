import autobind from 'class-autobind';
import classnames from 'classnames';
import type {ChangeEvent, ReactElement} from 'react';
import React from 'react';

import TaskCheckbox from 'src/task/components/checkbox';
import type {UpdateTask} from 'src/task/action_creators';

type Props = {
  task: Task,
  updateTask: UpdateTask,
};

class TaskLeafListItem extends React.Component<Props, never> {
  constructor(props: Props) {
    super(props);
    autobind(this);
  }

  toggleDone(event: ChangeEvent<HTMLInputElement>): void {
    const {task, updateTask} = this.props;
    const {checked} = event.target;

    event.stopPropagation();

    updateTask(task.id, {done: checked});
  }

  titleClass(): string {
    const {task} = this.props;

    return classnames({
      'task-item__title': true,
      [`task-item__title--priority-${task.priority}`]: task.priority,
    });
  }

  render(): ReactElement {
    const {task} = this.props;

    return (
      <li className='task-item'>
        <TaskCheckbox
          task={task}
          onChange={this.toggleDone}
          checked={task.status === 'done'}
        />
        <span className={this.titleClass()}>{task.title}</span>
      </li>
    );
  }
}

export default TaskLeafListItem;
