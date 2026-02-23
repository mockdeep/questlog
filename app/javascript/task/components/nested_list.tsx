import autobind from "class-autobind";
import {Component} from "react";
import type {ReactElement} from "react";

import {grab} from "helpers/grab";
import TaskLeafListItem from "./leaf_list_item";
import TaskParentListItem from "./parent_list_item";
import type {UpdateTask} from "../action_creators";

export type Props = {
  tasks: Task[],
  tasksByParentId: TasksByParentId,
  updateTask: UpdateTask,
};

class TaskNestedList extends Component<Props, never> {
  constructor(props: Props) {
    super(props);
    autobind(this);
  }

  taskListItem(task: Task): ReactElement {
    const {tasksByParentId, updateTask} = this.props;

    if (grab(tasksByParentId, task.id).length === 0) {
      return (
        <TaskLeafListItem
          key={task.id}
          task={task}
          updateTask={updateTask}
        />
      );
    }

    return (
      <TaskParentListItem
        key={task.id}
        task={task}
        updateTask={updateTask}
        tasksByParentId={tasksByParentId}
      />
    );
  }

  override render(): ReactElement {
    const {tasks} = this.props;

    return <ul className='task-tree'>{tasks.map(this.taskListItem)}</ul>;
  }
}

export default TaskNestedList;
