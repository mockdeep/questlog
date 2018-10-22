import autobind from 'class-autobind';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, {ChangeEvent} from 'react';

import TaskCheckbox from 'src/task/components/checkbox';
import {taskShape} from 'src/shapes';

type Props = {
  task: Task,
  updateTask: Function,
};

class TaskLeafListItem extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
    autobind(this);
  }

  toggleDone(event: ChangeEvent<HTMLInputElement>) {
    const {task, updateTask} = this.props;
    const {checked} = event.target;

    event.stopPropagation();

    updateTask(task.id, {done: checked});
  }

  titleClass() {
    const {task} = this.props;

    return classnames({
      'task-item__title': true,
      [`task-item__title--priority-${task.priority}`]: task.priority,
    });
  }

  render() {
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

TaskLeafListItem.propTypes = {
  task: taskShape.isRequired,
  updateTask: PropTypes.func.isRequired,
};

export default TaskLeafListItem;
