import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React from 'react';

import ErrorDisplay from 'src/_common/components/error_display';

class EditTaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    autobind(this);
  }

  getInitialState() {
    return {taskTitle: this.props.task.title, errors: []};
  }

  componentWillReceiveProps(newProps) {
    this.setState({taskTitle: newProps.task.title});
  }

  setTitle(event) {
    this.setState({taskTitle: event.target.value});
  }

  saveTask(event) {
    event.preventDefault();
    if (!this.isTaskReady) { return; }
    if (this.state.taskTitle.trim() === '') {
      const newErrors = this.state.errors.concat('task title can\'t be blank');

      this.setState({errors: newErrors});
    } else {
      const attrs = {title: this.state.taskTitle.trim()};

      this.props.updateTask(this.props.task.id, attrs);
      this.toggleDisplay();
    }
  }

  isTaskReady() {
    return this.props.task.loadingState === 'ready';
  }

  toggleDisplay() {
    $('#edit-task').click();
    this.replaceState(this.getInitialState());
  }

  buttonMessage() {
    const isUpdating = this.props.task.loadingState === 'updating';

    return isUpdating ? 'Updating Task' : 'Update Task';
  }

  render() {
    return (
      <div className='row'>
        <div className='col-md-12 edit-form' id='edit-form'>
          <form onSubmit={this.saveTask}>
            <ErrorDisplay errors={this.state.errors} />
            <div className='row'>
              <div className='col-md-6'>
                <input
                  type='text'
                  autoComplete='off'
                  id='edit-title'
                  className='task-input'
                  onChange={this.setTitle}
                  value={this.state.taskTitle}
                />
              </div>
              <div className='col-md-6'>
                <input
                  type='submit'
                  disabled={!this.isTaskReady}
                  className='btn btn-success btn-block'
                  value={this.buttonMessage()}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

EditTaskForm.propTypes = {
  task: PropTypes.object.isRequired,
  updateTask: PropTypes.func.isRequired,
};

export default EditTaskForm;
