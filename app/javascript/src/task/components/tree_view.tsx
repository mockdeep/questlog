import autobind from 'class-autobind';
import React from 'react';

import TaskNestedList from 'src/task/components/nested_list';
import TaskListFilters from 'src/task/components/list_filters';

type Props = {
  tasks: Task[],
  tasksByParentId: TasksByParentId,
  updateTask: Function,
};

class TaskTreeView extends React.Component<Props, never> {
  constructor(props: Props) {
    super(props);
    autobind(this);
  }

  render() {
    const {tasks, tasksByParentId, updateTask} = this.props;
    const listProps = {tasks, tasksByParentId, updateTask};

    return (
      <div>
        <TaskListFilters />
        <TaskNestedList {...listProps} />
      </div>
    );
  }
}

export default TaskTreeView;
