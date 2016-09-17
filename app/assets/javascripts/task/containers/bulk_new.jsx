'use strict';

const React = require('react');
const History = require('react-router').History;

const BulkTaskStore = require('task/bulk_store');

const BulkTasksNew = React.createClass({
  mixins: [History],

  getInitialState() {
    return {taskTitles: ''};
  },

  setTitles(event) {
    this.setState({taskTitles: event.target.value});
  },

  redirectToTaskList() {
    this.history.pushState(null, '/tasks');
  },

  saveTasks(event) {
    event.preventDefault();
    if (this.state.taskTitles.trim() === '') { return; }
    const tasksParams = {titles: this.state.taskTitles.trim()};

    BulkTaskStore.create(tasksParams).then(this.redirectToTaskList);
  },

  rootAttrs() {
    return {
      className: 'new_bulk_task',
      onSubmit: this.saveTasks,
      id: 'new_bulk_task'
    };
  },

  render() {
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
