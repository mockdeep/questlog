'use strict';

var React = require('react');
var _ = require('lodash');

var TimeBalancer = require('../time_balancer');
var TaskRow = require('./task_row');
var timeframeNameMap = require('./timeframe_name_map');

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

  timeTotal: function () {
    return _.sum(this.props.timeframe.tasks, this.getEstimate) / 60;
  },

  maxTime: function () {
    var timeframeName = this.props.timeframe.name;
    if (timeframeName === 'inbox') { return '?'; }
    return TimeBalancer.base_balances()[timeframeName] * this.props.medianProductivity / 60;
  },

  render: function () {
    var timeframeName = this.props.timeframe.name;
    var className = timeframeName === 'inbox' ? 'inbox' : 'timeframe';

    return (
      <div key={timeframeName} id={timeframeName} className={className}>
        <h2>{timeframeNameMap[timeframeName]} {this.timeTotal()}/{this.maxTime()}</h2>
        {this.props.timeframe.tasks.map(this.renderTask)}
      </div>
    );
  }
});

module.exports = TimeframeSection;
