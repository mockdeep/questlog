import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React from 'react';

import {taskShape} from 'src/shapes';

class NewTaskForm extends React.Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  setTitle(event) {
    const {task, updateTaskMeta} = this.props;
    const taskAttrs = {title: event.target.value};

    updateTaskMeta({newTask: {...task, ...taskAttrs}});
  }

  saveTask(event) {
    event.preventDefault();

    const {createTask, task} = this.props;

    createTask(task);
  }

  buttonMessage() {
    const {taskSaving} = this.props;

    return taskSaving ? 'Adding Task' : 'Add Task';
  }

  validTask() {
    const {task} = this.props;

    return task.title.trim().length > 0;
  }

  disabled() {
    const {taskSaving} = this.props;

    return taskSaving || !this.validTask();
  }

  render() {
    const {task} = this.props;

    return (
      <form onSubmit={this.saveTask} id='new-form'>
        <div className='row'>
          <input
            type='text'
            autoComplete='off'
            id='new-title'
            className='task-input'
            onChange={this.setTitle}
            placeholder={'e.g: do laundry #home @10am ~1h'}
            value={task.title}
          />
        </div>
        <div className='row'>
          <input
            type='submit'
            disabled={this.disabled()}
            className='btn btn-success btn-block'
            value={this.buttonMessage()}
          />
        </div>
      </form>
    );
  }
}

NewTaskForm.propTypes = {
  createTask: PropTypes.func.isRequired,
  task: taskShape.isRequired,
  taskSaving: PropTypes.bool.isRequired,
  updateTaskMeta: PropTypes.func.isRequired,
};

export default NewTaskForm;
