import PropTypes from 'prop-types';
import React from 'react';

import TaskEditTitleForm from 'src/task/containers/edit_title_form';
import NewTaskForm from 'src/task/containers/new_task_form';
import ParentTaskBreadCrumbs from 'src/task/containers/parent_task_bread_crumbs';
import SubTasksTable from 'src/task/components/sub_tasks_table';
import ToEnglish from 'src/_helpers/to_english';
import {taskShape} from 'src/shapes';

function repeatString(task) {
  if (!task.repeatSeconds) { return 'Repeat: never'; }

  return `Repeat: every ${ToEnglish.seconds(task.repeatSeconds)}`;
}

function estimateString(task) {
  if (!task.estimateSeconds) { return 'Estimate: none'; }

  return `Estimate: ${ToEnglish.seconds(task.estimateSeconds)}`;
}

function priorityString(task) {
  if (!task.priority) { return 'Priority: none'; }

  return `Priority: ${task.priority}`;
}

function tagString(task) {
  if (task.tagNames.length === 0) { return 'Tags: none'; }

  return `Tags: ${task.tagNames.join(', ')}`;
}

class TaskShowView extends React.Component {
  constructor(props) {
    super(props);

    const {task} = this.props;

    this.setScratchTask(task);
  }

  componentWillReceiveProps({task}) {
    this.setScratchTask(task);
  }

  componentWillUnmount() {
    const {updateTaskMeta} = this.props;

    updateTaskMeta({newTask: {title: ''}});
  }

  setScratchTask(task) {
    if (!task) { return; }

    const {updateTaskMeta} = this.props;
    const newTask = {
      priority: task.priority,
      repeatSeconds: task.repeatSeconds,
      releaseAt: task.releaseAt,
      tagNames: task.tagNames,
      timeframe: task.timeframe,
      parentTaskId: task.id,
      title: '',
    };

    updateTaskMeta({newTask});
  }

  render() {
    const {task, updateTask, deleteTask} = this.props;

    if (!task) { return null; }

    return (
      <section>
        <ParentTaskBreadCrumbs taskId={task.parentTaskId} />
        <h2>
          <TaskEditTitleForm keyPrefix={'showView'} task={task} />
        </h2>
        <div>
          {repeatString(task)}
        </div>
        <div>
          {estimateString(task)}
        </div>
        <div>
          {priorityString(task)}
        </div>
        <div>
          {tagString(task)}
        </div>

        <SubTasksTable
          task={task}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
        <NewTaskForm />
      </section>
    );
  }
}

TaskShowView.propTypes = {
  deleteTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  updateTaskMeta: PropTypes.func.isRequired,
  task: taskShape,
};

export default TaskShowView;
