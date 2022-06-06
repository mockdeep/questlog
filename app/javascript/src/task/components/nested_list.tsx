import autobind from 'class-autobind';
import React from 'react';

import TaskLeafListItem from 'src/task/components/leaf_list_item';
import TaskParentListItem from 'src/task/components/parent_list_item';
import {UpdateTask} from 'src/task/action_creators';

export type Props = {
  tasks: Task[],
  tasksByParentId: TasksByParentId,
  updateTask: UpdateTask,
};

class TaskNestedList extends React.Component<Props, never> {
  constructor(props: Props) {
    super(props);
    autobind(this);
  }

  taskListItem(task: Task) {
    const {tasksByParentId, updateTask} = this.props;
    const listItemProps = {key: task.id, task, updateTask};

    if (tasksByParentId[task.id].length === 0) {
      return <TaskLeafListItem {...listItemProps} />;
    }

    return (
      <TaskParentListItem
        {...listItemProps}
        tasksByParentId={tasksByParentId}
      />
    );
  }

  render() {
    const {tasks} = this.props;

    return <ul className='task-tree'>{tasks.map(this.taskListItem)}</ul>;
  }
}

export default TaskNestedList;
