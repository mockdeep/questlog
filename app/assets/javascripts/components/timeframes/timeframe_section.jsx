'use strict';

const React = require('react');

const TaskRow = require('components/tasks/task_row');

const TimeframeSection = React.createClass({
  propTypes: {
    timeframe: React.PropTypes.object.isRequired,
    timeframeSpace: React.PropTypes.object.isRequired,
    loadTasks: React.PropTypes.func.isRequired,
    storeTask: React.PropTypes.func.isRequired,
    destroyTask: React.PropTypes.func.isRequired
  },

  renderTask: function (task) {
    return (
      <TaskRow
        timeframeSpace={this.props.timeframeSpace}
        task={task}
        key={task.id}
        timeframesEnabled={true}
        loadTasks={this.props.loadTasks}
        storeTask={this.props.storeTask}
        destroyTask={this.props.destroyTask}
      />
    );
  },

  currentTasks: function () { return this.props.timeframe.currentTasks; },
  pendingTasks: function () { return this.props.timeframe.pendingTasks; },

  minuteTotal: function () {
    return this.props.timeframe.minuteTotal;
  },

  maxTime: function () {
    const minuteMax = this.props.timeframe.minuteMax;

    return isFinite(minuteMax) ? minuteMax : '∞';
  },

  currentTasksDiv: function () {
    if (this.props.timeframe.currentTasks.length === 0) { return false; }

    return (
      <div>
        {this.props.timeframe.currentTasks.map(this.renderTask)}
      </div>
    );
  },

  pendingTasksDiv: function () {
    if (this.props.timeframe.pendingTasks.length === 0) { return false; }

    return (
      <div className='pending'>
        {this.props.timeframe.pendingTasks.map(this.renderTask)}
      </div>
    );
  },

  ratioSpan: function () {
    const className = this.overLimit() ? 'danger' : '';

    return (
      <span className={className}>{this.minuteTotal()}/{this.maxTime()}</span>
    );
  },

  overLimit: function () {
    return this.minuteTotal() > this.maxTime();
  },

  render: function () {
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
