import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React from 'react';

import TaskLeafListItem from 'src/task/components/leaf_list_item';
import TaskParentListItem from 'src/task/components/parent_list_item';
import {taskShape} from 'src/shapes';

class TaskNestedList extends React.Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  taskListItem(task) {
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

TaskNestedList.propTypes = {
  tasks: PropTypes.arrayOf(taskShape).isRequired,
  tasksByParentId: PropTypes.objectOf(PropTypes.arrayOf(taskShape)).isRequired,
  updateTask: PropTypes.func.isRequired,
};

export default TaskNestedList;
