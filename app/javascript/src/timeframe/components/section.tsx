import autobind from 'class-autobind';
import React from 'react';

import TableHeaders from 'src/timeframe/components/table_headers';
import TaskRow from 'src/task/components/task_row';
import timeframeNameMap from 'src/timeframe/name_map';
import {calculateTotalMinutes} from 'src/timeframe/utils';
import type {UpdateTask} from 'src/task/action_creators';

type Props = {
  deleteTask: (taskId: number) => void,
  timeframe: Timeframe,
  timeframeSpace: TimeframeSpace,
  updateTask: UpdateTask,
};

class TimeframeSection extends React.Component<Props, never> {
  constructor(props: Props) {
    super(props);
    autobind(this);
  }

  renderTask(task: Task) {
    const {deleteTask, timeframeSpace, updateTask} = this.props;

    return (
      <TaskRow
        timeframesEnabled
        timeframeSpace={timeframeSpace}
        task={task}
        key={task.id}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />
    );
  }

  renderPendingTask(task: Task) {
    const {deleteTask, timeframeSpace, updateTask} = this.props;

    return (
      <TaskRow
        status='pending'
        timeframesEnabled
        timeframeSpace={timeframeSpace}
        task={task}
        key={task.id}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />
    );
  }

  minuteTotal() {
    const {timeframe} = this.props;

    return calculateTotalMinutes(timeframe);
  }

  maxTime(): number | '∞' {
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
        <table className='tasks-table'>
          <TableHeaders />
          <tbody>
            {this.currentTaskRows()}
            {this.pendingTaskRows()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TimeframeSection;
