import React from 'react';

import NewTaskForm from 'src/task/containers/new_task_form';
import TaskFooter from 'src/_common/components/task_footer';
import TaskDisplay from 'src/task/components/task_display';
import NotificationCheckbox from 'src/notification/containers/checkbox';

import TagStore from 'src/tag/store';
import TaskStore from 'src/task/store';

const TaskItem = React.createClass({
  propTypes: {
    deleteTask: React.PropTypes.func.isRequired,
    fetchTasks: React.PropTypes.func.isRequired,
    params: React.PropTypes.object.isRequired,
    tags: React.PropTypes.array.isRequired,
    url: React.PropTypes.string,
  },

  getInitialState() {
    return {
      task: {title: 'Loading...', loadingState: 'loading'},
      disabled: true,
      postponeSeconds: 300,
    };
  },

  componentDidMount() {
    this.loadTask().then(() => {
      this.unsubscribeTasks = TaskStore.subscribe(this.loadTask);
      this.setTitle();
    });
  },

  componentWillReceiveProps(nextProps) {
    this.loadTask(nextProps.url);
    this.setTitle();
  },

  componentWillUnmount() {
    this.unsubscribeTasks();
  },

  storePostponeSeconds(postponeSeconds) {
    this.setState({postponeSeconds});
  },

  setTitle() {
    document.title = `Task: ${this.state.task.title}`;
  },

  storeTask(taskId, attrs, opts) {
    const loadingState = (opts && opts.loadingState) || 'updating';
    const newTask = {...this.state.task, loadingState};

    this.setState({task: newTask});

    return TaskStore.update(taskId, attrs).then(this.props.fetchTasks);
  },

  loadTask() {
    const tagName = this.props.params.slug || '';

    return TagStore.get(tagName).then(this.updateTask);
  },

  updateTask(data) {
    if (data) {
      const task = {...data.task, loadingState: 'ready'};

      this.setState({task, disabled: false});
    } else {
      this.setState({task: {title: '(no tasks!)'}, disabled: true});
    }
    this.setTitle();
  },

  postponeTask(taskId) {
    this.setState({disabled: true});

    const attrs = {postpone: this.state.postponeSeconds};
    const taskStatus = 'postponing';

    this.storeTask(taskId, attrs, {taskStatus}).then(this.loadTask);
  },

  completeTask(taskId) {
    this.storeTask(taskId, {done: true}, {taskStatus: 'marking_done'});
  },

  render() {
    return (
      <div>
        <TaskDisplay
          task={this.state.task}
          tags={this.props.tags}
          disabled={this.state.disabled}
          storeTask={this.storeTask}
          storePostponeSeconds={this.storePostponeSeconds}
          postponeTask={this.postponeTask}
          completeTask={this.completeTask}
          deleteTask={this.props.deleteTask}
        />
        <NewTaskForm />

        <hr />
        <NotificationCheckbox
          task={this.state.task}
          completeTask={this.completeTask}
        />
        <TaskFooter />
      </div>
    );
  },
});

export default TaskItem;
