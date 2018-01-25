import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React from 'react';

import {taskShape} from 'src/shapes';

class TaskTree extends React.Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  subTaskTree() {
    const {task, tasksByParentId} = this.props;

    const subTasks = tasksByParentId[task.id];
    if (subTasks.length === 0) { return null; }

    return (
      <ul>
        {subTasks.map(subTask => (
          <TaskTree
            key={subTask.id}
            task={subTask}
            tasksByParentId={tasksByParentId}
          />
        ))}
      </ul>
    );
  }

  render() {
    const {task} = this.props;

    return (
      <li>
        {task.title}
        {this.subTaskTree()}
      </li>
    );
  }
}

TaskTree.propTypes = {
  task: taskShape.isRequired,
  tasksByParentId: PropTypes.objectOf(PropTypes.arrayOf(taskShape)).isRequired,
};

export default TaskTree;
