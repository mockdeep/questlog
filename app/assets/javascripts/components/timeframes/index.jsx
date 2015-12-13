'use strict';

var React = require('react');
var HTML5Backend = require('react-dnd-html5-backend');
var DragDropContext = require('react-dnd').DragDropContext;

var ToEnglish = require('../../to_english');
var TaskStore = require('../../stores/task_store');

var NewTaskForm = require('../tasks/_new_task_form');
var TimeframeStore = require('../../stores/timeframe_store');
var TimeframeSection = require('./_timeframe_section');

function timeframeHasTasks(timeframe) {
  return timeframe.currentTasks.length > 0 || timeframe.pendingTasks.length > 0;
}

var TimeframesIndex = React.createClass({

  getInitialState: function () {
    return { timeframes: [], medianProductivity: null, loading: true };
  },

  componentDidMount: function () {
    TimeframeStore.getAll().then(function (data) {
      this.updateTimeframes(data);
      TimeframeStore.on('change', this.loadTasks);
    }.bind(this));
  },

  componentWillUnmount: function () {
    TimeframeStore.off('change', this.loadTasks);
  },

  loadTasks: function () {
    TimeframeStore.getAll().then(this.updateTimeframes);
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

  timeframeSpace: function () {
    var counts = {};
    this.state.timeframes.forEach(function (timeframe) {
      counts[timeframe.name] = timeframe.minuteMax - timeframe.minuteTotal;
    });
    return counts;
  },

  renderTimeframe: function (timeframe) {
    return (
      <TimeframeSection
        key={timeframe.name}
        timeframe={timeframe}
        timeframeSpace={this.timeframeSpace()}
        medianProductivity={this.state.medianProductivity}
        loadTasks={this.loadTasks}
      />
    );
  },

  renderedTimeframes: function () {
    return this.timeframesWithTasks().map(this.renderTimeframe);
  },

  timeframesWithTasks: function () {
    return this.state.timeframes.filter(timeframeHasTasks);
  },

  refresh: function (event) {
    event.preventDefault();
    TaskStore.unload();
  },

  render: function () {
    if (this.state.loading) {
      return (<h1>Loading Timeframes...</h1>);
    } else {
      return (
        <div>
          <NewTaskForm loadTask={this.loadTasks} />
          <h2>Median Productivity: {this.productivityString()} per day</h2>
          <a onClick={this.refresh} href='/timeframes'>Refresh</a>
          {this.renderedTimeframes()}
        </div>
      );
    }
  }
});

module.exports = DragDropContext(HTML5Backend)(TimeframesIndex);
