import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React from 'react';

import TaskRow from 'src/task/components/task_row';
import timeframeNameMap from 'src/timeframe/name_map';
import {calculateTotalMinutes} from 'src/timeframe/utils';
import {timeframeShape, timeframeSpaceShape} from 'src/shapes';

const TABLE_HEADERS = (
  <tr className='task-list__header-row'>
    <th className='task-list__header' />
    <th className='task-list__header'>{'Title'}</th>
    <th className='task-list__header' />
    <th className='task-list__header'>{'Estimate'}</th>
    <th className='task-list__header' />
    <th className='task-list__header'>{'Priority'}</th>
    <th className='task-list__header'>{'Timeframe'}</th>
    <th className='task-list__header' />
  </tr>
);

class TimeframeSection extends React.Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  renderTask(task) {
    const {deleteTask, timeframe, timeframeSpace, updateTask} = this.props;

    return (
      <TaskRow
        timeframesEnabled
        timeframeSpace={timeframeSpace}
        task={task}
        key={task.id}
        keyPrefix={`${timeframe.name}TimeframeSection`}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />
    );
  }

  renderPendingTask(task) {
    const {deleteTask, timeframe, timeframeSpace, updateTask} = this.props;

    return (
      <TaskRow
        status='pending'
        timeframesEnabled
        timeframeSpace={timeframeSpace}
        task={task}
        key={task.id}
        keyPrefix={`${timeframe.name}PendingTimeframeSection`}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />
    );
  }

  minuteTotal() {
    const {timeframe} = this.props;

    return calculateTotalMinutes(timeframe);
  }

  maxTime() {
    const {timeframe} = this.props;

    return isFinite(timeframe.minuteMax) ? timeframe.minuteMax : '∞';
  }

  currentTaskRows() {
    const {timeframe} = this.props;

    if (timeframe.currentTasks.length === 0) { return false; }

    return timeframe.currentTasks.map(this.renderTask);
  }

  pendingTaskRows() {
    const {timeframe} = this.props;

    if (timeframe.pendingTasks.length === 0) { return false; }

    return timeframe.pendingTasks.map(this.renderPendingTask);
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
    const {timeframe} = this.props;
    const className = timeframe.name === 'inbox' ? 'inbox' : 'timeframe';

    return (
      <div key={timeframe.name} id={timeframe.name} className={className}>
        <hr />
        <h2>
          {timeframeNameMap[timeframe.name]}
          {' '}
          {this.ratioSpan()}
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
  timeframe: timeframeShape.isRequired,
  timeframeSpace: timeframeSpaceShape.isRequired,
  updateTask: PropTypes.func.isRequired,
};

export default TimeframeSection;
