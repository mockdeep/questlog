'use strict';

var React = require('react');
var extend = require('lodash').extend;

var ErrorDisplay = require('components/common/error_display');
var flash = require('helpers').flash;

var NewTaskForm = React.createClass({
  propTypes: {
    createTask: React.PropTypes.func.isRequired,
    loadTask: React.PropTypes.func.isRequired
  },

  getInitialState: function () {
    return {
      buttonContent: 'Add Task',
      disabled: false,
      errors: [],
      task: {title: ''}
    };
  },

  setTitle: function (event) {
    var newTask = extend({}, this.state.task, {title: event.target.value});
    this.setState({task: newTask});
  },

  saveTask: function (event) {
    event.preventDefault();
    if (this.state.disabled) { return; }
    if (this.state.task.title.trim() === '') {
      var newErrors = this.state.errors.concat('task title can\'t be blank');
      this.setState({errors: newErrors});
      return;
    }
    this.setState({buttonContent: 'Adding Task', disabled: true});
    this.props.createTask({title: this.state.task.title.trim()}).then(this.loadTask);
  },

  loadTask: function () {
    flash('success', 'Task added');
    this.props.loadTask();
    this.replaceState(this.getInitialState());
  },

  buttonMessage: function () {
    return this.state.buttonContent;
  },

  render: function () {
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

module.exports = NewTaskForm;
