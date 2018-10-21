import autobind from 'class-autobind';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, {ChangeEvent, MouseEvent} from 'react';
import {map} from 'lodash';

import grab from 'src/_helpers/grab';
import TaskEditIcon from 'src/task/components/edit_icon';
import TaskEditTitleForm from 'src/task/containers/edit_title_form';
import timeframeNameMap from 'src/timeframe/name_map';
import {taskShape, timeframeSpaceShape} from 'src/shapes';

const BUTTON_CLASS = 'btn btn-link tasks-table__action';

export type Props = {
  deleteTask: Function,
  keyPrefix: string,
  task: Task,
  updateTask: Function,
  isDragging?: boolean,
  status?: string,
  timeframesEnabled?: boolean,
  timeframeSpace?: TimeframeSpace,
};

class TaskRow extends React.PureComponent<Props, any> {
  domNode: any;

  constructor(props: Props) {
    super(props);
    autobind(this);
    this.state = {timeframeClicked: false};
  }

  markDone(event: MouseEvent) {
    const {task, updateTask} = this.props;

    event.preventDefault();
    updateTask(task.id, {done: true});
  }

  updatePriority(event: ChangeEvent<HTMLSelectElement>) {
    const {task, updateTask} = this.props;

    updateTask(task.id, {priority: event.target.value});
  }

  updateTimeframe(event: ChangeEvent<HTMLSelectElement>) {
    const {task, updateTask} = this.props;

    updateTask(task.id, {timeframe: event.target.value});
  }

  deleteTask(event: MouseEvent) {
    const {deleteTask, task} = this.props;

    event.preventDefault();
    // eslint-disable-next-line no-alert
    if (confirm('Delete this task?')) {
      deleteTask(task.id);
    }
  }

  emblems() {
    const {task} = this.props;

    if (!task.repeatSeconds) { return false; }

    return <i className='fas fa-redo-alt' title='task repeats' />;
  }

  className() {
    const {isDragging, status} = this.props;

    return classnames({
      'tasks-table__row': true,
      [`tasks-table__row--priority-${this.priority()}`]: this.priority(),
      [`tasks-table__row--${status}`]: status,
      'tasks-table__row--dragging': isDragging,
    });
  }

  priority() {
    const {task} = this.props;

    return task.priority || '';
  }

  timeframe() {
    const {task} = this.props;

    return task.timeframe;
  }

  timeframeHasSpace(name: string) {
    const {task, timeframeSpace} = this.props;

    return grab(timeframeSpace, name) >= task.estimateMinutes;
  }

  optionText(title: string, name: string) {
    const {timeframeSpace} = this.props;
    const space = grab(timeframeSpace, name);
    let text = title;

    if (this.timeframe() !== name && isFinite(space)) {
      text += ` (${space})`;
    }

    return text;
  }

  timeframeOptions() {
    const {timeframeClicked} = this.state;

    if (!timeframeClicked) {
      // hack optimization so that each task row doesn't need to re-render
      return map(timeframeNameMap, (title, name) => {
        const optionTitle = name === 'inbox' ? '-' : title;

        return <option value={name} key={name}>{optionTitle}</option>;
      });
    }
    return map(timeframeNameMap, (title, name) => {
      const disabled = !this.timeframeHasSpace(name);
      const optionTitle = name === 'inbox' ? '-' : title;

      return (
        <option value={name} disabled={disabled} key={name}>
          {this.optionText(optionTitle, name)}
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
    const {task} = this.props;

    return `${task.estimateMinutes} min`;
  }

  undoTask() {
    const {task, updateTask} = this.props;

    updateTask(task.id, {done: false});
  }

  undoButton() {
    const {task} = this.props;

    if (!task.pending) { return false; }

    return (
      <button className={BUTTON_CLASS} onClick={this.undoTask}>
        {'UNDO'}
      </button>
    );
  }

  storeDOMNode(domNode: HTMLTableRowElement) {
    this.domNode = domNode;
  }

  render() {
    const {keyPrefix, task, timeframesEnabled} = this.props;

    return (
      <tr className={this.className()} ref={this.storeDOMNode}>
        <td className='tasks-table__cell'>
          <button className={BUTTON_CLASS} onClick={this.markDone}>
            {'DONE'}
          </button>
        </td>
        <td><TaskEditTitleForm keyPrefix={keyPrefix} task={task} /></td>
        <td><TaskEditIcon task={task} /></td>
        <td>{this.taskEstimate()}</td>
        <td>{this.emblems()}</td>
        <td>
          <select onChange={this.updatePriority} value={this.priority()}>
            <option value=''>{'-'}</option>
            <option value='1'>{'1'}</option>
            <option value='2'>{'2'}</option>
            <option value='3'>{'3'}</option>
          </select>
        </td>
        <td>
          {timeframesEnabled ? this.timeframeSelector() : ''}
        </td>
        <td>
          {task.pending ? this.undoButton() : ''}
          <button className={BUTTON_CLASS} onClick={this.deleteTask}>
            {'DELETE'}
          </button>
        </td>
      </tr>
    );
  }
}

TaskRow.propTypes = {
  deleteTask: PropTypes.func.isRequired,
  keyPrefix: PropTypes.string.isRequired,
  task: taskShape.isRequired,
  updateTask: PropTypes.func.isRequired,
  isDragging: PropTypes.bool,
  status: PropTypes.string,
  timeframesEnabled: PropTypes.bool,
  timeframeSpace: timeframeSpaceShape,
};

export default TaskRow;
