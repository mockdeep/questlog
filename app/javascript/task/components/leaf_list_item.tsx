import autobind from "class-autobind";
import classnames from "classnames";
import type {ChangeEvent, ReactElement} from "react";
import {Component} from "react";

import TaskCheckbox from "./checkbox";
import type {UpdateTask} from "../action_creators";

type Props = {
  task: Task,
  updateTask: UpdateTask,
};

class TaskLeafListItem extends Component<Props, never> {
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
      "task-item__title": true,
      [`task-item__title--priority-${task.priority}`]: task.priority,
    });
  }

  override render(): ReactElement {
    const {task} = this.props;

    return (
      <li className='task-item'>
        <TaskCheckbox
          task={task}
          onChange={this.toggleDone}
          checked={task.status === "done"}
        />
        <span className={this.titleClass()}>{task.title}</span>
      </li>
    );
  }
}

export default TaskLeafListItem;
