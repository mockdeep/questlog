import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React from 'react';

import NewTaskForm from 'src/task/containers/new_task_form';
import TaskFooter from 'src/_common/components/task_footer';
import TaskDisplay from 'src/task/components/task_display';

class TaskFocusView extends React.Component {
  constructor(props) {
    super(props);
    autobind(this);
    this.props.updateScratch({postponeSeconds: 300});
  }

  storePostponeSeconds(postponeSeconds) {
    this.props.updateScratch({postponeSeconds});
  }

  setTitle() {
    document.title = `Task: ${this.task().title}`;
  }

  task() {
    const {ajaxState, task} = this.props;

    if (task) {
      return task;
    } else if (ajaxState === 'fetching' || ajaxState === 'taskSaving') {
      return {title: 'Loading...', loadingState: 'loading'};
    } else if (ajaxState === 'ready') {
      return {title: '(no tasks!)', loadingState: 'loading'};
    }

    throw new Error(`don't know how to deal with ajaxState "${ajaxState}"`);
  }

  isReady() {
    return this.task().loadingState === 'ready';
  }

  postponeTask(taskId) {
    const attrs = {postpone: this.props.scratch.postponeSeconds};

    this.props.updateTask(taskId, attrs);
  }

  completeTask(taskId) {
    this.props.updateTask(taskId, {done: true});
  }

  render() {
    this.setTitle();

    return (
      <div>
        <TaskDisplay
          task={this.task()}
          disabled={!this.isReady()}
          updateTask={this.props.updateTask}
          storePostponeSeconds={this.storePostponeSeconds}
          postponeTask={this.postponeTask}
          completeTask={this.completeTask}
          deleteTask={this.props.deleteTask}
        />
        <hr />
        <NewTaskForm />

        <TaskFooter task={this.task()} completeTask={this.completeTask} />
      </div>
    );
  }
}

TaskFocusView.propTypes = {
  ajaxState: PropTypes.string.isRequired,
  deleteTask: PropTypes.func.isRequired,
  scratch: PropTypes.object.isRequired,
  task: PropTypes.object,
  updateScratch: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  url: PropTypes.string,
};

export default TaskFocusView;
