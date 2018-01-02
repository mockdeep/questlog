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
    const {medianProductivity} = this.state;

    return ToEnglish.seconds(medianProductivity);
  }

  timeframeSpace() {
    const {timeframes} = this.state;
    const counts = {};

    timeframes.forEach(function setTimeframeCount(timeframe) {
      const minuteTotal = calculateTotalMinutes(timeframe);

      counts[timeframe.name] = timeframe.minuteMax - minuteTotal;
    });

    return counts;
  }

  renderTimeframe(timeframe) {
    const {medianProductivity} = this.state;
    const {deleteTask, updateTask} = this.props;

    return (
      <TimeframeSection
        key={timeframe.name}
        timeframe={timeframe}
        timeframeSpace={this.timeframeSpace()}
        medianProductivity={medianProductivity}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />
    );
  }

  renderedTimeframes() {
    return this.timeframesWithTasks().map(this.renderTimeframe);
  }

  timeframesWithTasks() {
    const {timeframes} = this.state;

    return timeframes.filter(timeframeHasTasks);
  }

  refresh(event) {
    const {fetchTasks} = this.props;

    event.preventDefault();
    TaskStore.unload();
    fetchTasks();
  }

  render() {
    const {loading} = this.state;

    if (loading) {
      return (
        <header className='timeframes-header'>
          <h2>{'Loading Timeframes...'}</h2>
        </header>
      );
    }

    return (
      <div>
        <NewTaskForm />
        <header className='timeframes-header'>
          <h2>{`Median Productivity: ${this.productivityString()} per day`}</h2>
          <a onClick={this.refresh} href='/timeframes'>{'Refresh'}</a>
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
