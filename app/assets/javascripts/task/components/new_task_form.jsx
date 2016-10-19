'use strict';

import React from 'react';
import {extend} from 'lodash';

import ErrorDisplay from '_common/components/error_display';
import flash from '_helpers/flash';

const NewTaskForm = React.createClass({
  propTypes: {
    createTask: React.PropTypes.func.isRequired,
    loadTask: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      buttonContent: 'Add Task',
      disabled: false,
      errors: [],
      task: {title: ''}
    };
  },

  setTitle(event) {
    const newTask = extend({}, this.state.task, {title: event.target.value});

    this.setState({task: newTask});
  },

  saveTask(event) {
    event.preventDefault();
    if (this.state.disabled) { return; }
    if (this.state.task.title.trim() === '') {
      const newErrors = this.state.errors.concat('task title can\'t be blank');

      this.setState({errors: newErrors});

      return;
    }
    this.setState({buttonContent: 'Adding Task', disabled: true});
    const taskAttrs = {title: this.state.task.title.trim()};

    this.props.createTask(taskAttrs).then(this.loadTask);
  },

  loadTask() {
    flash('success', 'Task added');
    this.props.loadTask();
    this.replaceState(this.getInitialState());
  },

  buttonMessage() {
    return this.state.buttonContent;
  },

  render() {
    return (
      <form onSubmit={this.saveTask} id='new-form'>
        <ErrorDisplay errors={this.state.errors} />
        <div className='row'>
          <div className='col-md-6'>
            <input
              type='text'
              autoComplete='off'
              id='new-title'
              className='task-input'
              onChange={this.setTitle}
              value={this.state.task.title}
              ref='title'
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
  }
});

export default NewTaskForm;
