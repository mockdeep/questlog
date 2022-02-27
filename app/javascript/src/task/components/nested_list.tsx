import autobind from 'class-autobind';
import React from 'react';

import TaskLeafListItem from 'src/task/components/leaf_list_item';
import TaskParentListItem from 'src/task/components/parent_list_item';

export type Props = {
  tasks: Task[],
  tasksByParentId: TasksByParentId,
  updateTask: Function,
};

class TaskNestedList extends React.Component<Props, any> {
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
