import React from 'react';

import ErrorDisplay from 'js/_common/components/error_display';

const NewTaskForm = React.createClass({
  propTypes: {
    createTask: React.PropTypes.func.isRequired,
    setNewTask: React.PropTypes.func.isRequired,
    task: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    return {
      buttonContent: 'Add Task',
      disabled: false,
    };
  },

  setTitle(event) {
    const taskAttrs = {title: event.target.value};

    this.props.setNewTask({...this.props.task, ...taskAttrs});
  },

  saveTask(event) {
    event.preventDefault();
    if (this.state.disabled) { return; }
    const {task} = this.props;

    if (task.title.trim() === '') {
      const errorMessage = 'task title can\'t be blank';
      const newErrors = _.uniq(task.errors.concat(errorMessage));

      this.props.setNewTask({...task, errors: newErrors});

      return;
    }
    this.setState({buttonContent: 'Adding Task', disabled: true});
    const taskAttrs = {title: this.props.task.title.trim()};

    this.props.createTask(taskAttrs).then(this.loadTask);
  },

  loadTask() {
    this.props.setNewTask({title: '', errors: []});
    this.replaceState(this.getInitialState());
  },

  buttonMessage() {
    return this.state.buttonContent;
  },

  render() {
    return (
      <form onSubmit={this.saveTask} id='new-form'>
        <ErrorDisplay errors={this.props.task.errors} />
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
              disabled={this.state.disabled}
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
