'use strict';

var React = require('react/addons');
var PureRenderMixin = React.PureRenderMixin;
var DragDropMixin = require('react-dnd').DragDropMixin;
var _ = require('lodash');

var timeframeNameMap = require('../../timeframe_name_map');

var TaskStore = require('../../stores/task_store');

var TaskRow = React.createClass({
  mixins: [DragDropMixin, PureRenderMixin],

  statics: {
    configureDragDrop: function (register) {
      register('task', {
        dragSource: {
          beginDrag: function (component) {
            return { item: { id: component.props.task.id } };
          },
          canDrag: function (component) {
            return !component.props.pending;
          },
          endDrag: function (component) {
            component.props.saveTaskPositions(component);
          }
        },
        dropTarget: {
          enter: function (component, item) {
            component.props.moveTask(item.id, component.props.task.id);
          }
        }
      });
    }
  },

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
    return this.props.task.priority;
  },

  timeframe: function () {
    return this.props.task.timeframe;
  },

  timeframeHasSpace: function (name) {
    return this.props.timeframeSpace[name] >= this.estimateMinutes();
  },

  optionText: function (title, name) {
    var text = title;
    var space = this.props.timeframeSpace[name];
    if (this.timeframe() !== name && isFinite(space)) {
      text += ' (' + space + ')';
    }
    return text;
  },

  estimateMinutes: function () {
    return Math.floor(this.props.task.estimate_seconds / 60);
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
      return '(' + Math.floor(this.props.task.estimate_seconds / 60) + ') ';
    }
  },

  render: function () {
    var dragSource = this.dragSourceFor('task');
    var dropTarget = this.dropTargetFor('task');
    var isDragging = this.getDragState('task').isDragging;
    var style = {opacity: isDragging ? 0 : 1};

    return (
      <li className={this.className()} {...dragSource} {...dropTarget} style={style}>
        {this.taskEstimate()}{this.props.task.title} {this.emblems()}
        {' | Pri: '}
        <select onChange={this.updatePriority} defaultValue={this.priority()}>
          <option value=''>-</option>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
        </select>
        {this.props.timeframesEnabled ? ' | When: ' : ''}
        {this.props.timeframesEnabled ? this.timeframeSelector() : ''}
        {' | '}
        <button className='btn btn-link' role='Link' onClick={this.markDone}>
          Done!
        </button>
        {' | '}
        <button className='btn btn-link' role='Link' onClick={this.deleteTask}>
          Delete
        </button>
      </li>
    );
  }
});

module.exports = TaskRow;
