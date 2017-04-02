import React from 'react';

import NewTaskForm from 'js/task/containers/new_task_form';
import TaskFooter from 'js/_common/components/task_footer';
import TaskDisplay from 'js/task/components/task_display';
import NotificationCheckbox from 'js/notification/components/checkbox';

import TagStore from 'js/tag/store';
import TaskStore from 'js/task/store';

const TaskItem = React.createClass({
  propTypes: {
    deleteTask: React.PropTypes.func.isRequired,
    disableNotifications: React.PropTypes.func.isRequired,
    enableNotifications: React.PropTypes.func.isRequired,
    notificationsEnabled: React.PropTypes.bool.isRequired,
    notificationsPermitted: React.PropTypes.bool.isRequired,
    params: React.PropTypes.object.isRequired,
    url: React.PropTypes.string,
  },

  getInitialState() {
    return {
      task: {title: 'Loading...', loadingState: 'loading'},
      disabled: true,
      tags: [],
      postponeSeconds: 300,
    };
  },

  componentDidMount() {
    this.loadTags().then(() => {
      this.unsubscribeTags = TagStore.subscribe(this.loadTags);
    });
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
    this.unsubscribeTags();
    this.unsubscribeTasks();
  },

  storePostponeSeconds(postponeSeconds) {
    this.setState({postponeSeconds});
  },

  loadTags() {
    return TagStore.getAll().then(this.setTags);
  },

  setTags(data) {
    this.setState({tags: data.tags});
  },

  setTitle() {
    document.title = `Task: ${this.state.task.title}`;
  },

  storeTask(taskId, attrs, opts) {
    const loadingState = (opts && opts.loadingState) || 'updating';
    const newTask = {...this.state.task, loadingState};

    this.setState({task: newTask});

    return TaskStore.update(taskId, attrs);
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
          tags={this.state.tags}
          disabled={this.state.disabled}
          storeTask={this.storeTask}
          storePostponeSeconds={this.storePostponeSeconds}
          postponeSeconds={this.state.postponeSeconds}
          postponeTask={this.postponeTask}
          completeTask={this.completeTask}
          deleteTask={this.props.deleteTask}
        />
        <NewTaskForm />

        <hr />
        <NotificationCheckbox
          task={this.state.task}
          completeTask={this.completeTask}
          enableNotifications={this.props.enableNotifications}
          disableNotifications={this.props.disableNotifications}
          notificationsEnabled={this.props.notificationsEnabled}
          notificationsPermitted={this.props.notificationsPermitted}
        />
        <TaskFooter />
      </div>
    );
  },
});

export default TaskItem;
