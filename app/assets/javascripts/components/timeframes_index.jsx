'use strict';

var React = require('react');
var helpers = require('../helpers');
var ToEnglish = require('../to_english');
var TaskRow = require('./task_row');

var timeframeNameMap = {
  inbox: 'Inbox',
  today: 'Today',
  week: 'This Week',
  month: 'This Month',
  quarter: 'This Quarter',
  year: 'This Year',
  lustrum: 'This Lustrum',
  decade: 'This Decade'
};

function renderTimeframe(timeframe) {
  var className = timeframe.name === 'inbox' ? 'inbox' : 'timeframe';

  return (
    <div key={timeframe.name} id={timeframe.name.toLowerCase()} className={className}>
      <h2>{timeframeNameMap[timeframe.name]}</h2>
      {timeframe.tasks.map(renderTask)}
    </div>
  );
};

function renderTask(task) {
  return (<TaskRow task={task} key={task.id} />);
}

function timeframeHasTasks(timeframe) {
  return timeframe.tasks.length > 0;
}

var TimeframesIndex = React.createClass({
  getInitialState: function () {
    return { medianProductivity: null, loading: true };
  },

  componentDidMount: function () {
    this.loadTimeframes();
  },

  loadTimeframes: function () {
    helpers.request({
      method: 'get',
      url: '/timeframes',
      success: this.updateTimeframes
    });
  },

  updateTimeframes: function (data) {
    this.setState({
      timeframes: data.timeframes,
      medianProductivity: data.meta.medianProductivity,
      loading: false
    });
  },

  productivityString: function () {
    return ToEnglish.seconds(this.state.medianProductivity);
  },

  renderedTimeframes: function () {
    return this.timeframesWithTasks().map(renderTimeframe);
  },

  timeframesWithTasks: function () {
    return this.state.timeframes.filter(timeframeHasTasks);
  },

  render: function () {
    if (this.state.loading) {
      return (<h1>Loading Timeframes...</h1>);
    } else {
      return (
        <div>
          <h1>Median Productivity: {this.productivityString()} per day</h1>
          {this.renderedTimeframes()}
        </div>
      );
    }
  }
});

module.exports = TimeframesIndex;
