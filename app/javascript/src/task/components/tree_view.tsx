import autobind from 'class-autobind';
import React from 'react';

import NewTaskForm from 'src/task/containers/new_task_form';
import TaskNestedList from 'src/task/components/nested_list';
import TaskListFilters from 'src/task/components/list_filters';

type Props = {
  tasks: Task[],
  tasksByParentId: TasksByParentId,
  updateTask: Function,
};

class TaskTreeView extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
    autobind(this);
  }

  render() {
    const {tasks, tasksByParentId, updateTask} = this.props;
    const listProps = {tasks, tasksByParentId, updateTask};

    return (
      <div>
        <NewTaskForm />
        <br />
        <TaskListFilters />
        <TaskNestedList {...listProps} />
      </div>
    );
  }
}

export default TaskTreeView;
