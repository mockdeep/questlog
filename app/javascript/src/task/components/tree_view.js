import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React from 'react';

import NewTaskForm from 'src/task/containers/new_task_form';
import TaskNestedList from 'src/task/components/nested_list';
import TaskListFilters from 'src/task/components/list_filters';
import {taskShape} from 'src/shapes';

class TaskTreeView extends React.Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  render() {
    const {tasks, tasksByParentId} = this.props;
    const listProps = {tasks, tasksByParentId};

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

TaskTreeView.propTypes = {
  tasks: PropTypes.arrayOf(taskShape).isRequired,
  tasksByParentId: PropTypes.objectOf(PropTypes.arrayOf(taskShape)).isRequired,
};

export default TaskTreeView;
