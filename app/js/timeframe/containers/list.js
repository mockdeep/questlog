import React from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import {DragDropContext as dragDropContext} from 'react-dnd';

import ToEnglish from 'js/_helpers/to_english';
import TaskStore from 'js/task/store';

import NewTaskForm from 'js/task/components/new_task_form';
import TimeframeStore from 'js/timeframe/store';
import TimeframeSection from 'js/timeframe/components/section';

function timeframeHasTasks(timeframe) {
  return timeframe.currentTasks.length > 0 || timeframe.pendingTasks.length > 0;
}

const TimeframeList = React.createClass({

  getInitialState() {
    return {timeframes: [], medianProductivity: null, loading: true};
  },

  componentDidMount() {
    TimeframeStore.getAll().then(function loadTimeframeData(data) {
      this.updateTimeframes(data);
      this.unsubscribeTimeframes = TimeframeStore.subscribe(this.loadTasks);
    }.bind(this));
  },

  componentWillUnmount() {
    this.unsubscribeTimeframes();
  },

  loadTasks() {
    TimeframeStore.getAll().then(this.updateTimeframes);
  },

  updateTimeframes(data) {
    this.setState({
      timeframes: data.timeframes,
      medianProductivity: data.meta.medianProductivity,
      loading: false,
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
    if (this.state.loading) { return <h1>{'Loading Timeframes...'}</h1>; }

    return (
      <div>
        <NewTaskForm loadTask={this.loadTasks} createTask={this.createTask} />
        <h2>{`Median Productivity: ${this.productivityString()} per day`}</h2>
        <a onClick={this.refresh} href='/timeframes'>{'Refresh'}</a>
        {this.renderedTimeframes()}
      </div>
    );
  },
});

export default dragDropContext(HTML5Backend)(TimeframeList);
