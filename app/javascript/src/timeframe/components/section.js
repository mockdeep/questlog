import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React from 'react';

import TaskRow from 'src/task/components/task_row';
import timeframeNameMap from 'src/timeframe/name_map';
import {calculateTotalMinutes} from 'src/timeframe/utils';

class TimeframeSection extends React.Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  renderTask(task) {
    return (
      <TaskRow
        timeframesEnabled
        timeframeSpace={this.props.timeframeSpace}
        task={task}
        key={task.id}
        updateTask={this.props.updateTask}
        deleteTask={this.props.deleteTask}
      />
    );
  }

  currentTasks() {
    return this.props.timeframe.currentTasks;
  }

  pendingTasks() {
    return this.props.timeframe.pendingTasks;
  }

  minuteTotal() {
    return calculateTotalMinutes(this.props.timeframe);
  }

  maxTime() {
    const {minuteMax} = this.props.timeframe;

    return isFinite(minuteMax) ? minuteMax : '∞';
  }

  currentTasksDiv() {
    if (this.props.timeframe.currentTasks.length === 0) { return false; }

    return (
      <div>
        {this.props.timeframe.currentTasks.map(this.renderTask)}
      </div>
    );
  }

  pendingTasksDiv() {
    if (this.props.timeframe.pendingTasks.length === 0) { return false; }

    return (
      <div className='pending'>
        {this.props.timeframe.pendingTasks.map(this.renderTask)}
      </div>
    );
  }

  ratioSpan() {
    const className = this.overLimit() ? 'danger' : '';

    return (
      <span className={className}>
        {`${this.minuteTotal()}/${this.maxTime()}`}
      </span>
    );
  }

  overLimit() {
    return this.minuteTotal() > this.maxTime();
  }

  render() {
    const timeframeName = this.props.timeframe.name;
    const className = timeframeName === 'inbox' ? 'inbox' : 'timeframe';

    return (
      <div key={timeframeName} id={timeframeName} className={className}>
        <hr />
        <h2>
          {timeframeNameMap[this.props.timeframe.name]} {this.ratioSpan()}
        </h2>
        {this.currentTasksDiv()}
        {this.pendingTasksDiv()}
      </div>
    );
  }
}

TimeframeSection.propTypes = {
  deleteTask: PropTypes.func.isRequired,
  timeframe: PropTypes.object.isRequired,
  timeframeSpace: PropTypes.object.isRequired,
  updateTask: PropTypes.func.isRequired,
};

export default TimeframeSection;
