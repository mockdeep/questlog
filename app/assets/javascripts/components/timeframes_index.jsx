'use strict';

var React = require('react');
var helpers = require('../helpers');
var ToEnglish = require('../to_english');

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
      medianProductivity: data.medianProductivity,
      loading: false
    });
  },

  productivityString: function () {
    return ToEnglish.seconds(this.state.medianProductivity);
  },

  render: function () {
    if (this.state.loading) {
      return (<h1>Loading Timeframes...</h1>);
    } else {
      return (
        <h1>Median Productivity: {this.productivityString()} per day</h1>
      );
    }
  }
});

module.exports = TimeframesIndex;
