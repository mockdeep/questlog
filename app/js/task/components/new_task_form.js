import React from 'react';

const NewTaskForm = React.createClass({
  propTypes: {
    createTask: React.PropTypes.func.isRequired,
    setNewTask: React.PropTypes.func.isRequired,
    task: React.PropTypes.object.isRequired,
    taskSaving: React.PropTypes.bool.isRequired,
  },

  setTitle(event) {
    const taskAttrs = {title: event.target.value};

    this.props.setNewTask({...this.props.task, ...taskAttrs});
  },

  saveTask(event) {
    event.preventDefault();

    this.props.createTask({title: this.props.task.title.trim()});
  },

  buttonMessage() {
    return this.props.taskSaving ? 'Adding Task' : 'Add Task';
  },

  validTask() {
    return this.props.task.title.trim().length > 0;
  },

  disabled() {
    return this.props.taskSaving || !this.validTask();
  },

  render() {
    return (
      <form onSubmit={this.saveTask} id='new-form'>
        <div className='row'>
          <div className='col-md-6'>
            <input
              type='text'
              autoComplete='off'
              id='new-title'
              className='task-input'
              onChange={this.setTitle}
              value={this.props.task.title}
            />
          </div>
          <div className='col-md-6'>
            <input
              type='submit'
              disabled={this.disabled()}
              className='btn btn-success btn-block'
              value={this.buttonMessage()}
            />
          </div>
        </div>
      </form>
    );
  },
});

export default NewTaskForm;
