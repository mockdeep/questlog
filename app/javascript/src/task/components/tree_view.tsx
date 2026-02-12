import autobind from "class-autobind";
import {Component} from "react";
import type {ReactElement} from "react";

import TaskNestedList from "src/task/components/nested_list";
import type {UpdateTask} from "src/task/action_creators";

type Props = {
  tasks: Task[],
  tasksByParentId: TasksByParentId,
  updateTask: UpdateTask,
};

class TaskTreeView extends Component<Props, never> {
  constructor(props: Props) {
    super(props);
    autobind(this);
  }

  render(): ReactElement {
    const {tasks, tasksByParentId, updateTask} = this.props;
    const listProps = {tasks, tasksByParentId, updateTask};

    return <TaskNestedList {...listProps} />;
  }
}

export default TaskTreeView;
