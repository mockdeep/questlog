import autobind from 'class-autobind';
import classnames from 'classnames';
import type {ReactElement} from 'react';
import React from 'react';

import TaskCheckbox from 'src/task/components/checkbox';
import TaskNestedList from 'src/task/components/nested_list';
import type {UpdateTask} from 'src/task/action_creators';

export type Props = {
  task: Task,
  tasksByParentId: TasksByParentId,
  updateTask: UpdateTask,
};

class TaskParentListItem extends React.Component<Props, never> {
  constructor(props: Props) {
    super(props);
    autobind(this);
  }

  titleClass(): string {
    const {task} = this.props;

    return classnames({
      'task-item__title': true,
      [`task-item__title--priority-${task.priority}`]: task.priority,
    });
  }

  render(): ReactElement {
    const {task, tasksByParentId, updateTask} = this.props;
    const tasks = tasksByParentId[task.id];
    const listProps = {tasks, tasksByParentId, updateTask};

    return (
      <li className='task-item'>
        <TaskCheckbox task={task} disabled />
        <span className={this.titleClass()}>{task.title}</span>
        <TaskNestedList {...listProps} />
      </li>
    );
  }
}

export default TaskParentListItem;
