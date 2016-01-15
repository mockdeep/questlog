'use strict';

var React = require('react');
var History = require('react-router').History;

var BulkTaskStore = require('stores/bulk_task_store');

var BulkTasksNew = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return {taskTitles: ''};
  },

  setTitles: function (event) {
    this.setState({taskTitles: event.target.value});
  },

  redirectToTasksIndex: function () {
    this.history.pushState(null, '/tasks');
  },

  saveTasks: function (event) {
    event.preventDefault();
    if (this.state.taskTitles.trim() == '') { return; }
    var tasksParams = {titles: this.state.taskTitles.trim()};
    BulkTaskStore.create(tasksParams).then(this.redirectToTasksIndex());
  },

  rootAttrs: function () {
    return {
      className: 'new_bulk_task',
      onSubmit: this.saveTasks,
      id: 'new_bulk_task',
    };
  },

  render: function () {
    return (
      <form {...this.rootAttrs()}>
        <div className='row'>
          <div className='col-md-offset-3 col-md-6'>
            <textarea
              id='new-titles'
              className='task-input'
              rows='15'
              onChange={this.setTitles}
              value={this.state.taskTitles}
              name='bulk_task[titles]'
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-offset-3 col-md-6'>
            <input
              type='submit'
              name='commit'
              value='Add Tasks'
              className='btn btn-success btn-block'
            />
          </div>
        </div>
      </form>
    );
  }
});

module.exports = BulkTasksNew;
