import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React from 'react';

import BulkTaskStore from 'src/task/bulk_store';

class BulkTasksNew extends React.Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  setTitles(event) {
    this.props.updateTaskMeta({newTask: {title: event.target.value}});
  }

  redirectToTaskList() {
    this.props.updateTaskMeta({newTask: {title: ''}});
    this.props.setRoute({name: 'tasks'});
  }

  saveTasks(event) {
    event.preventDefault();
    if (this.props.taskTitles.trim() === '') { return; }
    const tasksParams = {titles: this.props.taskTitles.trim()};

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
              value={this.props.taskTitles}
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

BulkTasksNew.propTypes = {
  setRoute: PropTypes.func.isRequired,
  taskTitles: PropTypes.string.isRequired,
  updateTaskMeta: PropTypes.func.isRequired,
};

export default BulkTasksNew;
