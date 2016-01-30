'use strict';

var React = require('react');

var ErrorDisplay = require('components/common/error_display');

var EditTaskForm = React.createClass({
  propTypes: {
    storeTask: React.PropTypes.func.isRequired,
    task: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return {taskTitle: this.props.task.title, errors: []};
  },

  setTitle: function (event) {
    this.setState({taskTitle: event.target.value});
  },

  saveTask: function (event) {
    event.preventDefault();
    if (!this.isTaskReady) { return; }
    if (this.state.taskTitle.trim() === '') {
      var newErrors = this.state.errors.concat('task title can\'t be blank');
      this.setState({errors: newErrors});
    } else {
      var attrs = {title: this.state.taskTitle.trim()};
      this.props.storeTask(this.props.task.id, attrs);
      this.toggleDisplay();
    }
  },

  isTaskReady: function () {
    return this.props.task.loadingState === 'ready';
  },

  toggleDisplay: function () {
    $('#edit-task').click();
    this.replaceState(this.getInitialState());
  },

  buttonMessage: function () {
    var isUpdating = this.props.task.loadingState === 'updating';
    return isUpdating ? 'Updating Task' : 'Update Task';
  },

  componentWillReceiveProps: function (newProps) {
    this.setState({taskTitle: newProps.task.title});
  },

  render: function () {
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
                  ref='title'
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
});

module.exports = EditTaskForm;
