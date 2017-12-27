import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React from 'react';
import {map} from 'lodash';

import TaskLink from 'src/task/components/link';
import timeframeNameMap from 'src/timeframe/name_map';
import {taskShape, timeframeSpaceShape} from 'src/shapes';

class TaskRow extends React.PureComponent {
  constructor(props) {
    super(props);
    autobind(this);
    this.state = {timeframeClicked: false};
  }

  markDone(event) {
    event.preventDefault();
    this.props.updateTask(this.props.task.id, {done: true});
  }

  updatePriority(event) {
    this.props.updateTask(this.props.task.id, {priority: event.target.value});
  }

  updateTimeframe(event) {
    this.props.updateTask(this.props.task.id, {timeframe: event.target.value});
  }

  deleteTask(event) {
    event.preventDefault();
    // eslint-disable-next-line no-alert
    if (confirm('Delete this task?')) {
      this.props.deleteTask(this.props.task.id);
    }
  }

  emblems() {
    if (!this.props.task.repeatSeconds) { return false; }

    return <i className='fa fa-repeat' title='task repeats' />;
  }

  className() {
    let classString = 'task-list__row';

    if (this.priority()) {
      classString += ` task-list__row--priority-${this.priority()}`;
    }

    if (this.props.status) {
      classString += ` task-list__row--${this.props.status}`;
    }

    if (this.props.isDragging) {
      classString += ' task-list__row--dragging';
    }

    return classString;
  }

  priority() {
    return this.props.task.priority || '';
  }

  timeframe() {
    return this.props.task.timeframe;
  }

  timeframeHasSpace(name) {
    return this.props.timeframeSpace[name] >= this.props.task.estimateMinutes;
  }

  optionText(title, name) {
    const space = this.props.timeframeSpace[name];
    let text = title;

    if (this.timeframe() !== name && isFinite(space)) {
      text += ` (${space})`;
    }

    return text;
  }

  timeframeOptions() {
    if (!this.state.timeframeClicked) {
      // hack optimization so that each task row doesn't need to re-render
      return map(timeframeNameMap, function timeframeOption(title, name) {
        const optionTitle = name === 'inbox' ? '-' : title;

        return (
          <option value={name} key={name}>
            {optionTitle}
          </option>
        );
      });
    }
    const that = this;

    return map(timeframeNameMap, function detailedTimeframeOption(title, name) {
      const disabled = !that.timeframeHasSpace(name);
      const optionTitle = name === 'inbox' ? '-' : title;

      return (
        <option value={name} disabled={disabled} key={name}>
          {that.optionText(optionTitle, name)}
        </option>
      );
    });
  }

  timeframeSelector() {
    return (
      <select
        className='timeframe-select'
        onFocus={this.timeframeClicked}
        defaultValue={this.timeframe()}
        onChange={this.updateTimeframe}
        name='timeframe-select'
      >
        {this.timeframeOptions()}
      </select>
    );
  }

  timeframeClicked() {
    this.setState({timeframeClicked: true});
  }

  taskEstimate() {
    return `${this.props.task.estimateMinutes} min`;
  }

  undoTask() {
    this.props.updateTask(this.props.task.id, {done: false});
  }

  undoButton() {
    if (!this.props.task.pending) { return false; }

    return (
      <button className='btn btn-link task-list__action' onClick={this.undoTask}>
        {'UNDO'}
      </button>
    );
  }

  storeDOMNode(domNode) {
    this.domNode = domNode;
  }

  render() {
    const {task, timeframesEnabled} = this.props;

    return (
      <tr className={this.className()} ref={this.storeDOMNode}>
        <td className='task-list__cell'>
          <button className='btn btn-link task-list__action' onClick={this.markDone}>
            {'DONE'}
          </button>
        </td>
        <td>
          <TaskLink task={task} />
        </td>
        <td>
          {this.taskEstimate()}
        </td>
        <td>
          {this.emblems()}
        </td>
        <td>
          <select onChange={this.updatePriority} value={this.priority()}>
            <option value=''>
              {'-'}
            </option>
            <option value='1'>
              {'1'}
            </option>
            <option value='2'>
              {'2'}
            </option>
            <option value='3'>
              {'3'}
            </option>
          </select>
        </td>
        <td>
          {timeframesEnabled ? this.timeframeSelector() : ''}
        </td>
        <td>
          {task.pending ? this.undoButton() : ''}
          <button className='btn btn-link task-list__action' onClick={this.deleteTask}>
            {'DELETE'}
          </button>
        </td>
      </tr>
    );
  }
}

TaskRow.propTypes = {
  deleteTask: PropTypes.func.isRequired,
  task: taskShape.isRequired,
  updateTask: PropTypes.func.isRequired,
  isDragging: PropTypes.bool,
  status: PropTypes.string,
  timeframesEnabled: PropTypes.bool,
  timeframeSpace: timeframeSpaceShape,
};

export default TaskRow;
