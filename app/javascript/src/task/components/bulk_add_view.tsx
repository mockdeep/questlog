import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React, {ChangeEvent, FormEvent} from 'react';

import BulkTaskStore from 'src/task/bulk_store';

type Props = {
  setRoute: Function,
  taskTitles: string,
  updateTaskMeta: Function,
};

class TaskBulkAddView extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
    autobind(this);
  }

  setTitles(event: ChangeEvent<HTMLTextAreaElement>) {
    const {updateTaskMeta} = this.props;

    updateTaskMeta({newTask: {title: event.target.value}});
  }

  redirectToTaskList() {
    const {setRoute, updateTaskMeta} = this.props;

    updateTaskMeta({newTask: {title: ''}});
    setRoute({name: 'tasks'});
  }

  saveTasks(event: FormEvent) {
    event.preventDefault();

    const {taskTitles} = this.props;

    if (taskTitles.trim() === '') { return; }

    const tasksParams = {titles: taskTitles.trim()};

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
    const {taskTitles} = this.props;

    return (
      <form {...this.rootAttrs()}>
        <div className='row'>
          <div className='col-md-offset-3 col-md-6'>
            <textarea
              id='new-titles'
              className='task-input'
              rows={15}
              onChange={this.setTitles}
              value={taskTitles}
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

TaskBulkAddView.propTypes = {
  setRoute: PropTypes.func.isRequired,
  taskTitles: PropTypes.string.isRequired,
  updateTaskMeta: PropTypes.func.isRequired,
};

export default TaskBulkAddView;
