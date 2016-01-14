'use strict';

var React = require('react');
var _ = require('lodash');

var TaskRow = require('components/tasks/_task_row');

var TimeframeSection = React.createClass({
  renderTask: function (task) {
    return (
      <TaskRow
        timeframeSpace={this.props.timeframeSpace}
        task={task}
        key={task.id}
        timeframesEnabled={true}
        loadTasks={this.props.loadTasks}
      />
    );
  },

  currentTasks: function () { return this.props.timeframe.currentTasks; },
  pendingTasks: function () { return this.props.timeframe.pendingTasks; },

  minuteTotal: function () {
    return this.props.timeframe.minuteTotal;
  },

  maxTime: function () {
    var minuteMax = this.props.timeframe.minuteMax;
    return isFinite(minuteMax) ? minuteMax : '∞';
  },

  currentTasksDiv: function () {
    if (this.props.timeframe.currentTasks.length > 0) {
      return (
        <div>
          {this.props.timeframe.currentTasks.map(this.renderTask)}
        </div>
      );
    }
  },

  pendingTasksDiv: function () {
    if (this.props.timeframe.pendingTasks.length > 0) {
      return (
        <div className='pending'>
          {this.props.timeframe.pendingTasks.map(this.renderTask)}
        </div>
      );
    }
  },

  ratioSpan: function () {
    var className = this.overLimit() ? 'danger' : '';

    return (
      <span className={className}>{this.minuteTotal()}/{this.maxTime()}</span>
    );
  },

  overLimit: function () {
    return this.minuteTotal() > this.maxTime();
  },

  render: function () {
    var timeframeName = this.props.timeframe.name;
    var className = timeframeName === 'inbox' ? 'inbox' : 'timeframe';

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
