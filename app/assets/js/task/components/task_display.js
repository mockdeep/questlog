'use strict';

import React from 'react';

import MainButtons from 'js/task/components/main_buttons';
import TaskTitle from 'js/task/components/task_title';
import TagButtons from 'js/task/components/tag_buttons';
import EditTaskForm from 'js/task/components/edit_task_form';

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
    task: React.PropTypes.object.isRequired,
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
  },
});

export default TaskDisplay;
