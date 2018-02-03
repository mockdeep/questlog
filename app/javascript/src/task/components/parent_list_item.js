import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React from 'react';

import TaskNestedList from 'src/task/components/nested_list';
import {taskShape} from 'src/shapes';

class TaskParentListItem extends React.Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  render() {
    const {task, tasksByParentId} = this.props;
    const tasks = tasksByParentId[task.id];
    const listProps = {tasks, tasksByParentId};

    return (
      <li>
        {task.title}
        <TaskNestedList {...listProps} />
      </li>
    );
  }
}

TaskParentListItem.propTypes = {
  task: taskShape.isRequired,
  tasksByParentId: PropTypes.objectOf(PropTypes.arrayOf(taskShape)).isRequired,
};

export default TaskParentListItem;
