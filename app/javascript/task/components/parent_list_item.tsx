import autobind from "class-autobind";
import classnames from "classnames";
import type {ReactElement} from "react";
import {Component} from "react";

import {grab} from "helpers/grab";
import TaskCheckbox from "./checkbox";
import TaskNestedList from "./nested_list";
import type {UpdateTask} from "../action_creators";

export type Props = {
  task: Task,
  tasksByParentId: TasksByParentId,
  updateTask: UpdateTask,
};

class TaskParentListItem extends Component<Props, never> {
  constructor(props: Props) {
    super(props);
    autobind(this);
  }

  titleClass(): string {
    const {task} = this.props;

    return classnames({
      "task-item__title": true,
      [`task-item__title--priority-${task.priority}`]: task.priority,
    });
  }

  override render(): ReactElement {
    const {task, tasksByParentId, updateTask} = this.props;
    const tasks = grab(tasksByParentId, task.id);
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
