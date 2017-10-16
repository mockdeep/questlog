import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React from 'react';

import TaskRow from 'src/task/components/task_row';
import timeframeNameMap from 'src/timeframe/name_map';
import {calculateTotalMinutes} from 'src/timeframe/utils';

const TABLE_HEADERS = (
  <tr className='task-list__header-row'>
    <th />
    <th>{'Title'}</th>
    <th>{'Estimate'}</th>
    <th />
    <th>{'Priority'}</th>
    <th>{'Timeframe'}</th>
    <th />
  </tr>
);

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

  renderPendingTask(task) {
    return (
      <TaskRow
        status='pending'
        timeframesEnabled
        timeframeSpace={this.props.timeframeSpace}
        task={task}
        key={task.id}
        updateTask={this.props.updateTask}
        deleteTask={this.props.deleteTask}
      />
    );
  }

  minuteTotal() {
    return calculateTotalMinutes(this.props.timeframe);
  }

  maxTime() {
    const {minuteMax} = this.props.timeframe;

    return isFinite(minuteMax) ? minuteMax : '∞';
  }

  currentTaskRows() {
    if (this.props.timeframe.currentTasks.length === 0) { return false; }

    return this.props.timeframe.currentTasks.map(this.renderTask);
  }

  pendingTaskRows() {
    if (this.props.timeframe.pendingTasks.length === 0) { return false; }

    return this.props.timeframe.pendingTasks.map(this.renderPendingTask);
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
        <table className='task-list'>
          <thead>{TABLE_HEADERS}</thead>
          <tbody>
            {this.currentTaskRows()}
            {this.pendingTaskRows()}
          </tbody>
        </table>
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
