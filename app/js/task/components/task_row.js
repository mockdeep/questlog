import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {DragSource as dragSource, DropTarget as dropTarget} from 'react-dnd';
import {map, flow} from 'lodash';

import timeframeNameMap from 'js/timeframe/name_map';

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

const TaskRow = React.createClass({
  propTypes: {
    connectDragSource: React.PropTypes.func.isRequired,
    connectDropTarget: React.PropTypes.func.isRequired,
    deleteTask: React.PropTypes.func.isRequired,
    isDragging: React.PropTypes.bool.isRequired,
    storeTask: React.PropTypes.func.isRequired,
    task: React.PropTypes.object.isRequired,
    timeframeSpace: React.PropTypes.object,
    timeframesEnabled: React.PropTypes.bool,
  },

  mixins: [PureRenderMixin],

  getInitialState() {
    return {timeframeClicked: false};
  },

  markDone(event) {
    event.preventDefault();
    this.props.storeTask(this.props.task.id, {done: true});
  },

  updatePriority(event) {
    this.props.storeTask(this.props.task.id, {priority: event.target.value});
  },

  updateTimeframe(event) {
    this.props.storeTask(this.props.task.id, {timeframe: event.target.value});
  },

  deleteTask(event) {
    event.preventDefault();
    // eslint-disable-next-line no-alert
    if (confirm('Delete this task?')) {
      this.props.deleteTask(this.props.task.id);
    }
  },

  emblems() {
    if (!this.props.task.repeatSeconds) { return false; }

    return <i className='fa fa-repeat' title='task repeats' />;
  },

  className() {
    let classString = '';

    if (this.priority()) {
      classString += ` priority-${this.priority()}`;
    }

    return classString;
  },

  priority() {
    return this.props.task.priority || '';
  },

  timeframe() {
    return this.props.task.timeframe;
  },

  timeframeHasSpace(name) {
    return this.props.timeframeSpace[name] >= this.props.task.estimateMinutes;
  },

  optionText(title, name) {
    const space = this.props.timeframeSpace[name];
    let text = title;

    if (this.timeframe() !== name && isFinite(space)) {
      text += ` (${space})`;
    }

    return text;
  },

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
  },

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
  },

  timeframeClicked() {
    this.setState({timeframeClicked: true});
  },

  taskEstimate() {
    if (!this.props.timeframesEnabled) { return false; }

    return `(${this.props.task.estimateMinutes}) `;
  },

  undoTask() {
    this.props.storeTask(this.props.task.id, {done: false});
  },

  undoButton() {
    if (!this.props.task.pending) { return false; }

    return (
      <button className='btn btn-link' role='Link' onClick={this.undoTask}>
        {'Undo'}
      </button>
    );
  },

  render() {
    const style = {opacity: this.props.isDragging ? 0 : 1};

    return (
      this.props.connectDropTarget(this.props.connectDragSource(
        <li className={this.className()} style={style}>
          {this.taskEstimate()}{this.props.task.title} {this.emblems()}
          {' | Pri: '}
          <select onChange={this.updatePriority} value={this.priority()}>
            <option value=''>{'-'}</option>
            <option value='1'>{'1'}</option>
            <option value='2'>{'2'}</option>
            <option value='3'>{'3'}</option>
          </select>
          {this.props.timeframesEnabled ? ' | When: ' : ''}
          {this.props.timeframesEnabled ? this.timeframeSelector() : ''}
          {' | '}
          {this.props.task.pending ? this.undoButton() : ''}
          {this.props.task.pending ? ' | ' : ''}
          <button className='btn btn-link' role='Link' onClick={this.markDone}>
            {'Done!'}
          </button>
          {' | '}
          <button
            className='btn btn-link'
            role='Link'
            onClick={this.deleteTask}
          >
            {'Delete'}
          </button>
        </li>
      ))
    );
  },
});

export default flow(
  dragSource('task', taskSource, sourceCollect),
  dropTarget('task', taskTarget, targetCollect)
)(TaskRow);
