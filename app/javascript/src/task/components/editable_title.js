import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React from 'react';

import TaskEditTitleForm from 'src/task/containers/edit_title_form';

class TaskEditableTitle extends React.Component {
  constructor(props) {
    super(props);
    autobind(this);
    props.updateScratch({mode: 'static'});
  }

  staticTitle() {
    return (
      <span onClick={this.enableEditing}>
        {this.props.task.title}
        <button className='btn btn-link btn-sm'>{'Edit'}</button>
      </span>
    );
  }

  enableEditing() {
    this.props.updateScratch({mode: 'edit'});
  }

  saveTask({title}) {
    const {task, updateTask, updateScratch} = this.props;

    updateTask(task.id, {title});

    updateScratch({mode: 'static'});
  }

  render() {
    const {scratch, task} = this.props;

    if (scratch.mode === 'edit') {
      return (
        <TaskEditTitleForm saveTask={this.saveTask} taskTitle={task.title} />
      );
    }

    return this.staticTitle();
  }
}

TaskEditableTitle.propTypes = {
  scratch: PropTypes.object.isRequired,
  task: PropTypes.object.isRequired,
  updateScratch: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
};

export default TaskEditableTitle;
