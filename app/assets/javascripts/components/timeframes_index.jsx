'use strict';

var React = require('react');
var helpers = require('../helpers');
var ToEnglish = require('../to_english');
var TaskRow = require('./task_row');

function renderTimeframe(timeframe) {
  return (
    <div key={timeframe.name} id={timeframe.name.toLowerCase()}>
      <h2>{timeframe.name}</h2>
      {timeframe.tasks.map(renderTask)}
    </div>
  );
};

function renderTask(task) {
  return (<TaskRow task={task} key={task.id} />);
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
    return this.state.timeframes.map(renderTimeframe);
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
