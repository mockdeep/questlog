'use strict';

const React = require('react');
const HTML5Backend = require('react-dnd-html5-backend');
const dragDropContext = require('react-dnd').DragDropContext;

const ToEnglish = require('to_english');
const TaskStore = require('stores/task_store');

const NewTaskForm = require('components/tasks/new_task_form');
const TimeframeStore = require('stores/timeframe_store');
const TimeframeSection = require('components/timeframes/timeframe_section');

function timeframeHasTasks(timeframe) {
  return timeframe.currentTasks.length > 0 || timeframe.pendingTasks.length > 0;
}

const TimeframesIndex = React.createClass({

  getInitialState() {
    return {timeframes: [], medianProductivity: null, loading: true};
  },

  componentDidMount() {
    TimeframeStore.getAll().then(function loadTimeframeData(data) {
      this.updateTimeframes(data);
      TimeframeStore.on('change', this.loadTasks);
    }.bind(this));
  },

  componentWillUnmount() {
    TimeframeStore.off('change', this.loadTasks);
  },

  loadTasks() {
    TimeframeStore.getAll().then(this.updateTimeframes);
  },

  updateTimeframes(data) {
    this.setState({
      timeframes: data.timeframes,
      medianProductivity: data.meta.medianProductivity,
      loading: false
    });
  },

  productivityString() {
    return ToEnglish.seconds(this.state.medianProductivity);
  },

  timeframeSpace() {
    const counts = {};

    this.state.timeframes.forEach(function setTimeframeCount(timeframe) {
      counts[timeframe.name] = timeframe.minuteMax - timeframe.minuteTotal;
    });

    return counts;
  },

  storeTask(taskId, attrs) {
    return TaskStore.update(taskId, attrs);
  },

  destroyTask(taskId) {
    TaskStore.destroy(taskId);
  },

  renderTimeframe(timeframe) {
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

  renderedTimeframes() {
    return this.timeframesWithTasks().map(this.renderTimeframe);
  },

  timeframesWithTasks() {
    return this.state.timeframes.filter(timeframeHasTasks);
  },

  refresh(event) {
    event.preventDefault();
    TaskStore.unload();
  },

  createTask(attrs) {
    return TaskStore.create(attrs);
  },

  render() {
    if (this.state.loading) {
      return <h1>{'Loading Timeframes...'}</h1>;
    } else {
      return (
        <div>
          <NewTaskForm loadTask={this.loadTasks} createTask={this.createTask} />
          <h2>{`Median Productivity: ${this.productivityString()} per day`}</h2>
          <a onClick={this.refresh} href='/timeframes'>{'Refresh'}</a>
          {this.renderedTimeframes()}
        </div>
      );
    }
  }
});

module.exports = dragDropContext(HTML5Backend)(TimeframesIndex);
