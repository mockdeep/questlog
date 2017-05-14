import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React from 'react';

import BulkTaskStore from 'src/task/bulk_store';

class BulkTasksNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {taskTitles: ''};
    autobind(this);
  }

  setTitles(event) {
    this.setState({taskTitles: event.target.value});
  }

  redirectToTaskList() {
    this.props.history.push('/tasks');
  }

  saveTasks(event) {
    event.preventDefault();
    if (this.state.taskTitles.trim() === '') { return; }
    const tasksParams = {titles: this.state.taskTitles.trim()};

    BulkTaskStore.create(tasksParams).then(this.redirectToTaskList);
  }

  rootAttrs() {
    return {
      className: 'new_bulk_task',
      onSubmit: this.saveTasks,
      id: 'new_bulk_task',
    };
  }

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
}

BulkTasksNew.propTypes = {history: PropTypes.object.isRequired};

export default BulkTasksNew;
