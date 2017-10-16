import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React from 'react';
import {DragSource as dragSource, DropTarget as dropTarget} from 'react-dnd';
import {map, flow} from 'lodash';

import timeframeNameMap from 'src/timeframe/name_map';

const taskSource = {
  canDrag(props) {
    return !props.timeframesEnabled;
  },

  beginDrag(props) {
    return {item: {id: props.task.id}};
  },

  endDrag(props, _monitor, component) {
    props.saveTaskPositions(component);
  },
};

const taskTarget = {
  hover(props, monitor) {
    const draggedId = monitor.getItem().item.id;

    props.moveTask(draggedId, props.task.id);
  },
};

function sourceCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

function targetCollect(connect) {
  return {connectDropTarget: connect.dropTarget()};
}

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
    let classString = '';

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
          <option value={name} key={name}>{optionTitle}</option>
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
      <button className='btn btn-link' onClick={this.undoTask}>
        {'Undo'}
      </button>
    );
  }

  element() {
    return (
      <tr className={this.className()}>
        <td>
          <button className='btn btn-link task-list__action' onClick={this.markDone}>
            {'DONE'}
          </button>
        </td>
        <td>{this.props.task.title}</td>
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
        <td>{this.props.timeframesEnabled ? this.timeframeSelector() : ''}</td>
        <td>
          {this.props.task.pending ? this.undoButton() : ''}
          <button className='btn btn-link task-list__action' onClick={this.deleteTask}>
            {'DELETE'}
          </button>
        </td>
      </tr>
    );
  }

  render() {
    return this.props.connectDropTarget(this.props.connectDragSource(this.element()));
  }
}

TaskRow.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  status: PropTypes.string,
  task: PropTypes.object.isRequired,
  timeframeSpace: PropTypes.object,
  timeframesEnabled: PropTypes.bool,
  updateTask: PropTypes.func.isRequired,
};

export default flow(
  dragSource('task', taskSource, sourceCollect),
  dropTarget('task', taskTarget, targetCollect)
)(TaskRow);
