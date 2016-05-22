'use strict';

const React = require('react');

const MainButtons = require('components/tasks/main_buttons');
const TaskTitle = require('components/tasks/task_title');
const TagButtons = require('components/tasks/tag_buttons');
const EditTaskForm = require('components/tasks/edit_task_form');

const TaskDisplay = React.createClass({
  propTypes: {
    task: React.PropTypes.object.isRequired,
    tags: React.PropTypes.array.isRequired,
    disabled: React.PropTypes.bool.isRequired,
    disable: React.PropTypes.func.isRequired,
    postponeSeconds: React.PropTypes.number.isRequired,
    storePostponeSeconds: React.PropTypes.func.isRequired,
    postponeTask: React.PropTypes.func.isRequired,
    completeTask: React.PropTypes.func.isRequired,
    storeTask: React.PropTypes.func.isRequired,
    loadTask: React.PropTypes.func.isRequired,
    deleteTask: React.PropTypes.func.isRequired
  },

  render: function () {
    return (
      <div>
        <TagButtons task={this.props.task} tags={this.props.tags} />
        <TaskTitle
          task={this.props.task}
          loadTask={this.props.loadTask}
          deleteTask={this.props.deleteTask}
        />
        <MainButtons
          task={this.props.task}
          loadTask={this.props.loadTask}
          disabled={this.props.disabled}
          disable={this.props.disable}
          storePostponeSeconds={this.props.storePostponeSeconds}
          postponeSeconds={this.props.postponeSeconds}
          postponeTask={this.props.postponeTask}
          completeTask={this.props.completeTask}
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
