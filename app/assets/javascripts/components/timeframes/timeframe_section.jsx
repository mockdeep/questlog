'use strict';

const React = require('react');

const TaskRow = require('components/tasks/task_row');

const TimeframeSection = React.createClass({
  propTypes: {
    destroyTask: React.PropTypes.func.isRequired,
    loadTasks: React.PropTypes.func.isRequired,
    storeTask: React.PropTypes.func.isRequired,
    timeframe: React.PropTypes.object.isRequired,
    timeframeSpace: React.PropTypes.object.isRequired
  },

  renderTask(task) {
    return (
      <TaskRow
        timeframesEnabled
        timeframeSpace={this.props.timeframeSpace}
        task={task}
        key={task.id}
        loadTasks={this.props.loadTasks}
        storeTask={this.props.storeTask}
        destroyTask={this.props.destroyTask}
      />
    );
  },

  currentTasks() { return this.props.timeframe.currentTasks; },
  pendingTasks() { return this.props.timeframe.pendingTasks; },

  minuteTotal() {
    return this.props.timeframe.minuteTotal;
  },

  maxTime() {
    const minuteMax = this.props.timeframe.minuteMax;

    return isFinite(minuteMax) ? minuteMax : '∞';
  },

  currentTasksDiv() {
    if (this.props.timeframe.currentTasks.length === 0) { return false; }

    return (
      <div>
        {this.props.timeframe.currentTasks.map(this.renderTask)}
      </div>
    );
  },

  pendingTasksDiv() {
    if (this.props.timeframe.pendingTasks.length === 0) { return false; }

    return (
      <div className='pending'>
        {this.props.timeframe.pendingTasks.map(this.renderTask)}
      </div>
    );
  },

  ratioSpan() {
    const className = this.overLimit() ? 'danger' : '';

    return (
      <span className={className}>
        {`${this.minuteTotal()}/${this.maxTime()}`}
      </span>
    );
  },

  overLimit() {
    return this.minuteTotal() > this.maxTime();
  },

  render() {
    const timeframeName = this.props.timeframe.name;
    const className = timeframeName === 'inbox' ? 'inbox' : 'timeframe';

    return (
      <div key={timeframeName} id={timeframeName} className={className}>
        <hr />
        <h2>
          {this.props.timeframe.title} {this.ratioSpan()}
        </h2>
        {this.currentTasksDiv()}
        {this.pendingTasksDiv()}
      </div>
    );
  }
});

module.exports = TimeframeSection;
