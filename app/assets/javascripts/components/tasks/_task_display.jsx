'use strict';

var React = require('react');

var MainButtons = require('components/tasks/_main_buttons');
var TaskTitle = require('components/tasks/_task_title');
var TagButtons = require('components/tasks/_tag_buttons');
var EditTaskForm = require('components/tasks/_edit_task_form');

var TaskDisplay = React.createClass({
  propTypes: {
    postponeSeconds: React.PropTypes.number.isRequired,
    postponeTask: React.PropTypes.func.isRequired,
    storeTask: React.PropTypes.func.isRequired
  },

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
          storePostponeSeconds={this.props.storePostponeSeconds}
          postponeSeconds={this.props.postponeSeconds}
          postponeTask={this.props.postponeTask}
        />
        <hr />
        <EditTaskForm
          task={this.props.task}
          storeTask={this.props.storeTask}
        />
      </div>
    );
  }
});

module.exports = TaskDisplay;
