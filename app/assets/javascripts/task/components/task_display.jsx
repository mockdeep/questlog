'use strict';

const React = require('react');

const MainButtons = require('task/components/main_buttons');
const TaskTitle = require('task/components/task_title');
const TagButtons = require('task/components/tag_buttons');
const EditTaskForm = require('task/components/edit_task_form');

const TaskDisplay = React.createClass({
  propTypes: {
    completeTask: React.PropTypes.func.isRequired,
    deleteTask: React.PropTypes.func.isRequired,
    disable: React.PropTypes.func.isRequired,
    disabled: React.PropTypes.bool.isRequired,
    loadTask: React.PropTypes.func.isRequired,
    postponeSeconds: React.PropTypes.number.isRequired,
    postponeTask: React.PropTypes.func.isRequired,
    storePostponeSeconds: React.PropTypes.func.isRequired,
    storeTask: React.PropTypes.func.isRequired,
    tags: React.PropTypes.array.isRequired,
    task: React.PropTypes.object.isRequired
  },

  render() {
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
