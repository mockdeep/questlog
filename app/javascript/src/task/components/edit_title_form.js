import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React from 'react';

class TaskEditTitleForm extends React.Component {
  constructor(props) {
    super(props);
    autobind(this);
    props.updateScratch({taskTitle: props.taskTitle});
  }

  updateTitleInput(event) {
    this.props.updateScratch({taskTitle: event.target.value});
  }

  saveTask(event) {
    event.preventDefault();

    this.props.saveTask({title: this.props.scratch.taskTitle});
  }

  render() {
    return (
      <form onSubmit={this.saveTask}>
        <input
          autoFocus
          value={this.props.scratch.taskTitle || this.props.taskTitle}
          onChange={this.updateTitleInput}
          onBlur={this.saveTask}
        />
        <button type='submit' className='btn btn-primary btn-sm'>
          {'Save'}
        </button>
      </form>
    );
  }
}

TaskEditTitleForm.propTypes = {
  saveTask: PropTypes.func.isRequired,
  scratch: PropTypes.object.isRequired,
  taskTitle: PropTypes.string.isRequired,
  updateScratch: PropTypes.func.isRequired,
};

export default TaskEditTitleForm;
