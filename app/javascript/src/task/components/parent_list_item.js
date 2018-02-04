import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React from 'react';

import TaskCheckbox from 'src/task/components/checkbox';
import TaskNestedList from 'src/task/components/nested_list';
import {taskShape} from 'src/shapes';

class TaskParentListItem extends React.Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  render() {
    const {task, tasksByParentId, updateTask} = this.props;
    const tasks = tasksByParentId[task.id];
    const listProps = {tasks, tasksByParentId, updateTask};

    let titleClass = 'task-item__title';
    if (task.priority) {
      titleClass += ` task-item__title--priority-${task.priority}`;
    }

    return (
      <li className='task-item'>
        <TaskCheckbox task={task} disabled />
        <span className={titleClass}>{task.title}</span>
        <TaskNestedList {...listProps} />
      </li>
    );
  }
}

TaskParentListItem.propTypes = {
  task: taskShape.isRequired,
  tasksByParentId: PropTypes.objectOf(PropTypes.arrayOf(taskShape)).isRequired,
  updateTask: PropTypes.func.isRequired,
};

export default TaskParentListItem;
