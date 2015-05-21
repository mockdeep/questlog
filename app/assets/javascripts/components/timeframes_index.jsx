'use strict';

var React = require('react');

var helpers = require('../helpers');
var ToEnglish = require('../to_english');
var TimeframeSection = require('./timeframe_section');

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

  renderTimeframe: function (timeframe) {
    return (
      <TimeframeSection
        key={timeframe.name}
        timeframe={timeframe}
        loadTimeframes={this.loadTimeframes}
      />
    );
  },

  renderedTimeframes: function () {
    return this.timeframesWithTasks().map(this.renderTimeframe);
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
