import React from 'react';

import NewTaskForm from 'js/task/components/new_task_form';
import TaskFooter from 'js/_common/components/task_footer';
import TaskDisplay from 'js/task/components/task_display';
import NotificationCheckbox from 'js/notification/containers/checkbox';

import TagStore from 'js/tag/store';
import TaskStore from 'js/task/store';

const TaskItem = React.createClass({
  propTypes: {
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
    this.loadTags().then(function setTagStoreCallback() {
      this.unsubscribeTags = TagStore.subscribe(this.loadTags);
    }.bind(this));
    this.loadTask().then(function setTaskStoreCallback() {
      this.unsubscribeTasks = TaskStore.subscribe(this.loadTask);
      this.setTitle();
    }.bind(this));
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

  disable() {
    this.setState({disabled: true});
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

  createTask(attrs) {
    return TaskStore.create(attrs).then(this.loadTask);
  },

  postponeTask(taskId) {
    const attrs = {postpone: this.state.postponeSeconds};

    return this.storeTask(taskId, attrs, {taskStatus: 'postponing'});
  },

  completeTask(taskId) {
    this.storeTask(taskId, {done: true}, {taskStatus: 'marking_done'});
  },

  deleteTask(taskId) {
    TaskStore.destroy(taskId);
  },

  render() {
    return (
      <div>
        <TaskDisplay
          task={this.state.task}
          tags={this.state.tags}
          disable={this.disable}
          loadTask={this.loadTask}
          disabled={this.state.disabled}
          storeTask={this.storeTask}
          storePostponeSeconds={this.storePostponeSeconds}
          postponeSeconds={this.state.postponeSeconds}
          postponeTask={this.postponeTask}
          completeTask={this.completeTask}
          deleteTask={this.deleteTask}
        />
        <NewTaskForm createTask={this.createTask} />

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
