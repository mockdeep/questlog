'use strict';

var React = require('react');
var _ = require('lodash');

var TimeBalancer = require('../../time_balancer');
var TaskRow = require('../tasks/_task_row');
var timeframeNameMap = require('../../timeframe_name_map');

var TimeframeSection = React.createClass({
  renderTask: function (task) {
    return (
      <TaskRow
        task={task}
        key={task.id}
        timeframesEnabled={true}
        loadTasks={this.props.loadTasks}
      />
    );
  },

  getEstimate: function (task) {
    return _.isNumber(task.estimate_seconds) ? task.estimate_seconds : 1800;
  },

  currentTasks: function () { return this.props.timeframe.currentTasks; },
  pendingTasks: function () { return this.props.timeframe.pendingTasks; },

  allTasks: function () {
    return this.currentTasks().concat(this.pendingTasks());
  },

  timeTotal: function () {
    return Math.floor(_.sum(this.allTasks(), this.getEstimate) / 60);
  },

  baseBalance: function () {
    var balanceTime = window.balanceTime;
    return TimeBalancer.base_balances(balanceTime)[this.props.timeframe.name];
  },

  maxTime: function () {
    if (this.props.timeframe.name === 'inbox') { return '?'; }
    return Math.floor(this.baseBalance() * this.props.medianProductivity / 60);
  },

  currentTasksDiv: function () {
    if (this.props.timeframe.currentTasks.length > 0) {
      return (
        <div>
          <h3>Current Tasks</h3>
          {this.props.timeframe.currentTasks.map(this.renderTask)}
        </div>
      );
    }
  },

  pendingTasksDiv: function () {
    if (this.props.timeframe.pendingTasks.length > 0) {
      return (
        <div className='pending'>
          <h3>Pending Tasks</h3>
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
        <h2>
          {timeframeNameMap[timeframeName]} {this.timeTotal()}/{this.maxTime()}
        </h2>
        {this.currentTasksDiv()}
        {this.pendingTasksDiv()}
      </div>
    );
  }
});

module.exports = TimeframeSection;
