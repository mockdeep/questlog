import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React from 'react';

import ToEnglish from 'src/_helpers/to_english';
import TaskStore from 'src/task/store';

import NewTaskForm from 'src/task/containers/new_task_form';
import TimeframeStore from 'src/timeframe/store';
import TimeframeSection from 'src/timeframe/components/section';
import {calculateTotalMinutes} from 'src/timeframe/utils';

function timeframeHasTasks(timeframe) {
  return timeframe.currentTasks.length > 0 || timeframe.pendingTasks.length > 0;
}

class TimeframeListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {timeframes: [], medianProductivity: null, loading: true};
    autobind(this);
  }

  componentDidMount() {
    TimeframeStore.getAll().then((data) => {
      this.updateTimeframes(data);
      this.unsubscribeTimeframes = TimeframeStore.subscribe(this.loadTasks);
    });
  }

  componentWillUnmount() {
    this.unsubscribeTimeframes();
  }

  loadTasks() {
    TimeframeStore.getAll().then(this.updateTimeframes);
  }

  updateTimeframes(data) {
    this.setState({
      timeframes: data.timeframes,
      medianProductivity: data.meta.medianProductivity,
      loading: false,
    });
  }

  productivityString() {
    return ToEnglish.seconds(this.state.medianProductivity);
  }

  timeframeSpace() {
    const counts = {};

    this.state.timeframes.forEach(function setTimeframeCount(timeframe) {
      const minuteTotal = calculateTotalMinutes(timeframe);

      counts[timeframe.name] = timeframe.minuteMax - minuteTotal;
    });

    return counts;
  }

  renderTimeframe(timeframe) {
    return (
      <TimeframeSection
        key={timeframe.name}
        timeframe={timeframe}
        timeframeSpace={this.timeframeSpace()}
        medianProductivity={this.state.medianProductivity}
        updateTask={this.props.updateTask}
        deleteTask={this.props.deleteTask}
      />
    );
  }

  renderedTimeframes() {
    return this.timeframesWithTasks().map(this.renderTimeframe);
  }

  timeframesWithTasks() {
    return this.state.timeframes.filter(timeframeHasTasks);
  }

  refresh(event) {
    event.preventDefault();
    TaskStore.unload();
    this.props.fetchTasks();
  }

  render() {
    if (this.state.loading) {
      return (
        <header className='timeframes-header'>
          <h2>
            {'Loading Timeframes...'}
          </h2>
        </header>
      );
    }

    return (
      <div>
        <NewTaskForm />
        <header className='timeframes-header'>
          <h2>
            {`Median Productivity: ${this.productivityString()} per day`}
          </h2>
          <a onClick={this.refresh} href='/timeframes'>
            {'Refresh'}
          </a>
        </header>
        {this.renderedTimeframes()}
      </div>
    );
  }
}

TimeframeListView.propTypes = {
  deleteTask: PropTypes.func.isRequired,
  fetchTasks: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
};

export default TimeframeListView;
