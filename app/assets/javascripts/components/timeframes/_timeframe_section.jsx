'use strict';

var React = require('react');
var _ = require('lodash');

var TaskRow = require('../tasks/_task_row');
var timeframeNameMap = require('../../timeframe_name_map');

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

  render: function () {
    var timeframeName = this.props.timeframe.name;
    var className = timeframeName === 'inbox' ? 'inbox' : 'timeframe';

    return (
      <div key={timeframeName} id={timeframeName} className={className}>
        <hr />
        <h2>
          {timeframeNameMap[timeframeName]} {this.minuteTotal()}/{this.maxTime()}
        </h2>
        {this.currentTasksDiv()}
        {this.pendingTasksDiv()}
      </div>
    );
  }
});

module.exports = TimeframeSection;
