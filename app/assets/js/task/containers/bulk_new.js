import React from 'react';
import {browserHistory} from 'react-router';

import BulkTaskStore from 'js/task/bulk_store';

const BulkTasksNew = React.createClass({
  getInitialState() {
    return {taskTitles: ''};
  },

  setTitles(event) {
    this.setState({taskTitles: event.target.value});
  },

  redirectToTaskList() {
    browserHistory.push('/tasks');
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
      id: 'new_bulk_task',
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
  },
});

export default BulkTasksNew;
