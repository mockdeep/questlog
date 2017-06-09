import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React from 'react';

import NewTaskForm from 'src/task/containers/new_task_form';
import TaskFooter from 'src/_common/components/task_footer';
import TaskDisplay from 'src/task/components/task_display';
import NotificationCheckbox from 'src/notification/containers/checkbox';

class TaskItem extends React.Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  storePostponeSeconds(postponeSeconds) {
    this.props.updateTaskMeta({postponeSeconds});
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
    const attrs = {postpone: this.props.postponeSeconds};

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
          tags={this.props.tags}
          disabled={!this.isReady()}
          storeTask={this.props.updateTask}
          storePostponeSeconds={this.storePostponeSeconds}
          postponeTask={this.postponeTask}
          completeTask={this.completeTask}
          deleteTask={this.props.deleteTask}
          updateTagMeta={this.props.updateTagMeta}
        />
        <NewTaskForm />

        <hr />
        <NotificationCheckbox
          task={this.task()}
          completeTask={this.completeTask}
        />
        <TaskFooter />
      </div>
    );
  }
}

TaskItem.propTypes = {
  ajaxState: PropTypes.string.isRequired,
  deleteTask: PropTypes.func.isRequired,
  postponeSeconds: PropTypes.number.isRequired,
  tags: PropTypes.array.isRequired,
  task: PropTypes.object,
  updateTagMeta: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  updateTaskMeta: PropTypes.func.isRequired,
  url: PropTypes.string,
};

export default TaskItem;
