import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React from 'react';

import NewTaskForm from 'src/task/containers/new_task_form';
import TaskFooter from 'src/_common/components/task_footer';
import TaskDisplay from 'src/task/components/task_display';
import {taskShape, scratchShape} from 'src/shapes';

class TaskFocusView extends React.Component {
  constructor(props) {
    super(props);
    autobind(this);

    const {updateScratch} = this.props;

    updateScratch({postponeSeconds: 300});
  }

  storePostponeSeconds(postponeSeconds) {
    const {updateScratch} = this.props;

    updateScratch({postponeSeconds});
  }

  setTitle(title) {
    document.title = title;
  }

  postponeTask(taskId) {
    const {scratch, updateTask} = this.props;

    const attrs = {postpone: scratch.postponeSeconds};

    updateTask(taskId, attrs);
  }

  completeTask(taskId) {
    const {updateTask} = this.props;

    updateTask(taskId, {done: true});
  }

  mainDisplay() {
    const {ajaxState, task} = this.props;

    if (task) {
      return this.nextTaskDisplay();
    } else if (['fetching', 'taskSaving'].includes(ajaxState)) {
      return this.loadingDisplay();
    } else if (ajaxState === 'ready') {
      return this.noTaskDisplay();
    }

    throw new Error(`don't know how to deal with ajaxState "${ajaxState}"`);
  }

  nextTaskDisplay() {
    const {deleteTask, task, updateTask} = this.props;
    const {completeTask, postponeTask, storePostponeSeconds} = this;

    this.setTitle(task.title);

    return (
      <TaskDisplay
        task={task}
        disabled={!task.loadingState === 'ready'}
        updateTask={updateTask}
        storePostponeSeconds={storePostponeSeconds}
        postponeTask={postponeTask}
        completeTask={completeTask}
        deleteTask={deleteTask}
      />
    );
  }

  loadingDisplay() {
    this.setTitle('Loading...');

    return (
      <div>
        <h1>
          {'Loading...'}
        </h1>
      </div>
    );
  }

  noTaskDisplay() {
    this.setTitle('(no tasks!)');

    return (
      <div>
        <h2>
          {'No tasks! Try adding one below:'}
        </h2>
      </div>
    );
  }

  render() {
    const {task} = this.props;

    return (
      <div>
        {this.mainDisplay()}
        <hr />
        <NewTaskForm />

        <TaskFooter task={task} completeTask={this.completeTask} />
      </div>
    );
  }
}

TaskFocusView.propTypes = {
  ajaxState: PropTypes.string.isRequired,
  deleteTask: PropTypes.func.isRequired,
  scratch: scratchShape.isRequired,
  updateScratch: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  task: taskShape,
  url: PropTypes.string,
};

export default TaskFocusView;
