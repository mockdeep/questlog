'use strict';

const React = require('react');
const HTML5Backend = require('react-dnd-html5-backend');
const dragDropContext = require('react-dnd').DragDropContext;

const ToEnglish = require('to_english');
const TaskStore = require('stores/task_store');

const NewTaskForm = require('components/tasks/new_task_form');
const TimeframeStore = require('stores/timeframe_store');
const TimeframeSection = require('components/timeframes/timeframe_section');

const timeframeHasTasks = function (timeframe) {
  return timeframe.currentTasks.length > 0 || timeframe.pendingTasks.length > 0;
};

const TimeframesIndex = React.createClass({

  getInitialState: function () {
    return {timeframes: [], medianProductivity: null, loading: true};
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
    const counts = {};

    this.state.timeframes.forEach(function (timeframe) {
      counts[timeframe.name] = timeframe.minuteMax - timeframe.minuteTotal;
    });

    return counts;
  },

  storeTask: function (taskId, attrs) {
    return TaskStore.update(taskId, attrs);
  },

  destroyTask: function (taskId) {
    TaskStore.destroy(taskId);
  },

  renderTimeframe: function (timeframe) {
    return (
      <TimeframeSection
        key={timeframe.name}
        timeframe={timeframe}
        timeframeSpace={this.timeframeSpace()}
        medianProductivity={this.state.medianProductivity}
        loadTasks={this.loadTasks}
        storeTask={this.storeTask}
        destroyTask={this.destroyTask}
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

  createTask: function (attrs) {
    return TaskStore.create(attrs);
  },

  render: function () {
    if (this.state.loading) {
      return <h1>Loading Timeframes...</h1>;
    } else {
      return (
        <div>
          <NewTaskForm loadTask={this.loadTasks} createTask={this.createTask} />
          <h2>Median Productivity: {this.productivityString()} per day</h2>
          <a onClick={this.refresh} href='/timeframes'>Refresh</a>
          {this.renderedTimeframes()}
        </div>
      );
    }
  }
});

module.exports = dragDropContext(HTML5Backend)(TimeframesIndex);
