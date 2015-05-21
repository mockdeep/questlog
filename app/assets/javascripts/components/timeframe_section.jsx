'use strict';

var React = require('react');

var TaskRow = require('./task_row');
var timeframeNameMap = require('./timeframe_name_map');

var TimeframeSection = React.createClass({
  timeframe: function () {
    return this.props.timeframe;
  },

  timeframeName: function () {
    return this.timeframe().name();
  },

  renderTask: function (task) {
    return (
      <TaskRow
        task={task}
        key={task.id}
        timeframesEnabled={true}
        loadTimeframes={this.props.loadTimeframes}
      />
    );
  },

  render: function () {
    var timeframeName = this.props.timeframe.name;
    var className = timeframeName === 'inbox' ? 'inbox' : 'timeframe';

    return (
      <div key={timeframeName} id={timeframeName} className={className}>
        <h2>{timeframeNameMap[timeframeName]}</h2>
        {this.props.timeframe.tasks.map(this.renderTask)}
      </div>
    );
  }
});

module.exports = TimeframeSection;
