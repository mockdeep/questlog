'use strict';

var React = require('react');

var MainButtons = require('./_main_buttons');
var TaskTitle = require('./_task_title');
var TagButtons = require('./_tag_buttons');
var EditTaskForm = require('./_edit_task_form');

var TaskDisplay = React.createClass({
  render: function () {
    return (
      <div>
        <TagButtons task={this.props.task} tags={this.props.tags} />
        <TaskTitle
          task={this.props.task}
          loadTask={this.props.loadTask}
        />
        <MainButtons
          task={this.props.task}
          loadTask={this.props.loadTask}
          disabled={this.props.disabled}
          disable={this.props.disable}
        />
        <hr />
        <EditTaskForm task={this.props.task} />
      </div>
    );
  }
});

module.exports = TaskDisplay;
