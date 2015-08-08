'use strict';

var React = require('react/addons');
var PureRenderMixin = React.PureRenderMixin;
var DragSource = require('react-dnd').DragSource;
var DropTarget = require('react-dnd').DropTarget;
var _ = require('lodash');

var timeframeNameMap = require('../../timeframe_name_map');

var TaskStore = require('../../stores/task_store');

var taskSource = {
  canDrag: function (props) {
    return !props.timeframesEnabled;
  },

  beginDrag: function (props) {
    return { item: { id: props.task.id } };
  },

  endDrag: function (props, monitor, component) {
    props.saveTaskPositions(component);
  }
};

var taskTarget = {
  hover: function (props, monitor) {
    var draggedId = monitor.getItem().item.id;
    props.moveTask(draggedId, props.task.id);
  }
}

function sourceCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

function targetCollect(connect, monitor) {
  return { connectDropTarget: connect.dropTarget() };
}

var TaskRow = React.createClass({
  mixins: [PureRenderMixin],

  getInitialState: function () {
    return {timeframeClicked: false};
  },

  markDone: function (event) {
    event.preventDefault();
    TaskStore.update(this.props.task.id, {done: true});
  },

  updatePriority: function (event) {
    TaskStore.update(this.props.task.id, {priority: event.target.value});
  },

  updateTimeframe: function (event) {
    TaskStore.update(this.props.task.id, {timeframe: event.target.value});
  },

  deleteTask: function (event) {
    event.preventDefault();
    if (confirm('Delete this task?')) { TaskStore.destroy(this.props.task.id); }
  },

  emblems: function () {
    if (this.props.task.repeat_seconds) {
      return <i className='fa fa-repeat' title='task repeats' />;
    } else {
      return '';
    }
  },

  className: function () {
    var classString = '';
    if (this.priority()) {
      classString += ' priority-' + this.priority();
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
    var text = title;
    var space = this.props.timeframeSpace[name];
    if (this.timeframe() !== name && isFinite(space)) {
      text += ' (' + space + ')';
    }
    return text;
  },

  timeframeOptions: function () {
    if (!this.state.timeframeClicked) {
      // hack optimization so that each task row doesn't need to re-render
      return _.map(timeframeNameMap, function (title, name) {
        if (name === 'inbox') { title = '-'; }
        return (
          <option value={name} key={name}>{title}</option>
        );
      });
    }
    var self = this;
    return _.map(timeframeNameMap, function (title, name) {
      var disabled = !self.timeframeHasSpace(name);
      if (name === 'inbox') { title = '-'; }
      return (
        <option value={name} disabled={disabled} key={name}>
          {self.optionText(title, name)}
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
    if (this.props.timeframesEnabled) {
      return '(' + this.props.task.estimate_minutes + ') ';
    }
  },

  undoTask: function () {
    TaskStore.update(this.props.task.id, {done: false});
  },

  undoButton: function () {
    if (this.props.task.pending) {
      return (
        <button className='btn btn-link' role='Link' onClick={this.undoTask}>
          Undo
        </button>
      );
    }
  },

  render: function () {
    var style = {opacity: this.props.isDragging ? 0 : 1};

    return (
      this.props.connectDropTarget(this.props.connectDragSource(
        <li className={this.className()} style={style}>
          {this.taskEstimate()}{this.props.task.title} {this.emblems()}
          {' | Pri: '}
          <select onChange={this.updatePriority} value={this.priority()}>
            <option value=''>-</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
          </select>
          {this.props.timeframesEnabled ? ' | When: ' : ''}
          {this.props.timeframesEnabled ? this.timeframeSelector() : ''}
          {' | '}
          {this.props.task.pending ? this.undoButton() : ''}
          {this.props.task.pending ? ' | ' : ''}
          <button className='btn btn-link' role='Link' onClick={this.markDone}>
            Done!
          </button>
          {' | '}
          <button className='btn btn-link' role='Link' onClick={this.deleteTask}>
            Delete
          </button>
        </li>
      ))
    );
  }
});

module.exports = _.flow(
  DragSource('task', taskSource, sourceCollect),
  DropTarget('task', taskTarget, targetCollect)
)(TaskRow);
