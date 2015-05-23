'use strict';

var React = require('react/addons');
var PureRenderMixin = React.PureRenderMixin;
var DragDropMixin = require('react-dnd').DragDropMixin;
var _ = require('lodash');

var timeframeNameMap = require('./timeframe_name_map');

var helpers = require('../helpers');

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

  markDone: function (event) {
    event.preventDefault();
    helpers.request({
      url: 'tasks/' + this.props.task.id,
      data: {task: {done: true}},
      success: this.props.loadTasks
    });
  },

  updatePriority: function (event) {
    helpers.request({
      url: 'tasks/' + this.props.task.id,
      data: {task: {priority: event.target.value}},
      success: this.props.loadTasks
    });
  },

  updateTimeframe: function (event) {
    helpers.request({
      url: 'tasks/' + this.props.task.id,
      data: {task: {timeframe: event.target.value}},
      success: this.props.loadTasks
    });
  },

  deleteTask: function (event) {
    event.preventDefault();
    if (confirm('Delete this task?')) {
      helpers.request({
        url: 'tasks/' + this.props.task.id,
        method: 'delete',
        success: this.props.loadTasks
      });
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

  timeframeOptions: function () {
    return _.map(timeframeNameMap, function (title, name) {
      if (name == 'inbox') { title = '-'; }
      return (<option value={name} key={name}>{title}</option>);
    });
  },

  timeframeSelector: function () {
    return (
      <select defaultValue={this.timeframe()} onChange={this.updateTimeframe} name='timeframe-select'>
        {this.timeframeOptions()}
      </select>
    );
  },

  render: function () {
    var dragSource = this.dragSourceFor('task');
    var dropTarget = this.dropTargetFor('task');
    var isDragging = this.getDragState('task').isDragging;
    var style = {opacity: isDragging ? 0 : 1};

    return (
      <li className={this.className()} {...dragSource} {...dropTarget} style={style}>
        {this.props.task.title} {this.emblems()}
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
