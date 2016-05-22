'use strict';

const React = require('react');
const PureRenderMixin = React.PureRenderMixin;
const dragSource = require('react-dnd').DragSource;
const dropTarget = require('react-dnd').DropTarget;
const _ = require('lodash');
const map = _.map;
const flow = _.flow;

const timeframeNameMap = require('timeframe_name_map');

const taskSource = {
  canDrag: function (props) {
    return !props.timeframesEnabled;
  },

  beginDrag: function (props) {
    return {item: {id: props.task.id}};
  },

  endDrag: function (props, _monitor, component) {
    props.saveTaskPositions(component);
  }
};

const taskTarget = {
  hover: function (props, monitor) {
    const draggedId = monitor.getItem().item.id;

    props.moveTask(draggedId, props.task.id);
  }
};

const sourceCollect = function (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
};

const targetCollect = function (connect) {
  return {connectDropTarget: connect.dropTarget()};
};

const TaskRow = React.createClass({
  propTypes: {
    connectDragSource: React.PropTypes.func.isRequired,
    connectDropTarget: React.PropTypes.func.isRequired,
    destroyTask: React.PropTypes.func.isRequired,
    isDragging: React.PropTypes.bool.isRequired,
    storeTask: React.PropTypes.func.isRequired,
    task: React.PropTypes.object.isRequired,
    timeframeSpace: React.PropTypes.object,
    timeframesEnabled: React.PropTypes.bool
  },

  mixins: [PureRenderMixin],

  getInitialState: function () {
    return {timeframeClicked: false};
  },

  markDone: function (event) {
    event.preventDefault();
    this.props.storeTask(this.props.task.id, {done: true});
  },

  updatePriority: function (event) {
    this.props.storeTask(this.props.task.id, {priority: event.target.value});
  },

  updateTimeframe: function (event) {
    this.props.storeTask(this.props.task.id, {timeframe: event.target.value});
  },

  deleteTask: function (event) {
    event.preventDefault();
    // eslint-disable-next-line no-alert
    if (confirm('Delete this task?')) {
      this.props.destroyTask(this.props.task.id);
    }
  },

  emblems: function () {
    if (this.props.task.repeat_seconds) {
      return <i className='fa fa-repeat' title='task repeats' />;
    } else {
      return '';
    }
  },

  className: function () {
    let classString = '';

    if (this.priority()) {
      classString += ` priority-${this.priority()}`;
    }

    return classString;
  },

  priority: function () {
    return this.props.task.priority || '';
  },

  timeframe: function () {
    return this.props.task.timeframe;
  },

  timeframeHasSpace: function (name) {
    return this.props.timeframeSpace[name] >= this.props.task.estimate_minutes;
  },

  optionText: function (title, name) {
    const space = this.props.timeframeSpace[name];
    let text = title;

    if (this.timeframe() !== name && isFinite(space)) {
      text += ` (${space})`;
    }

    return text;
  },

  timeframeOptions: function () {
    if (!this.state.timeframeClicked) {
      // hack optimization so that each task row doesn't need to re-render
      return map(timeframeNameMap, function (title, name) {
        const optionTitle = name === 'inbox' ? '-' : title;

        return (
          <option value={name} key={name}>{optionTitle}</option>
        );
      });
    }
    const that = this;

    return map(timeframeNameMap, function (title, name) {
      const disabled = !that.timeframeHasSpace(name);
      const optionTitle = name === 'inbox' ? '-' : title;

      return (
        <option value={name} disabled={disabled} key={name}>
          {that.optionText(optionTitle, name)}
        </option>
      );
    });
  },

  timeframeSelector: function () {
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

  timeframeClicked: function () {
    this.setState({timeframeClicked: true});
  },

  taskEstimate: function () {
    if (!this.props.timeframesEnabled) { return false; }

    return `(${this.props.task.estimate_minutes}) `;
  },

  undoTask: function () {
    this.props.storeTask(this.props.task.id, {done: false});
  },

  undoButton: function () {
    if (!this.props.task.pending) { return false; }

    return (
      <button className='btn btn-link' role='Link' onClick={this.undoTask}>
        {'Undo'}
      </button>
    );
  },

  render: function () {
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
          <button className='btn btn-link' role='Link' onClick={this.deleteTask}>
            {'Delete'}
          </button>
        </li>
      ))
    );
  }
});

module.exports = flow(
  dragSource('task', taskSource, sourceCollect),
  dropTarget('task', taskTarget, targetCollect)
)(TaskRow);
