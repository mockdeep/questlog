import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React from 'react';

import TaskListHeader from 'src/task/components/list_header';
import TaskTree from 'src/task/components/tree';
import {taskShape} from 'src/shapes';

class TaskTreeView extends React.Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  render() {
    const {tasks, tasksByParentId} = this.props;

    return (
      <div>
        <TaskListHeader />
        <ul>
          {tasks.map(task => (
            <TaskTree
              key={task.id}
              task={task}
              tasksByParentId={tasksByParentId}
            />
          ))}
        </ul>
      </div>
    );
  }
}

TaskTreeView.propTypes = {
  tasks: PropTypes.arrayOf(taskShape).isRequired,
  tasksByParentId: PropTypes.objectOf(PropTypes.arrayOf(taskShape)).isRequired,
};

export default TaskTreeView;
