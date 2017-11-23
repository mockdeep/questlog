import PropTypes from 'prop-types';
import React from 'react';

import NewTaskForm from 'src/task/containers/new_task_form';
import ParentTaskBreadCrumbs from 'src/task/containers/parent_task_bread_crumbs';
import SubTasksTable from 'src/task/components/sub_tasks_table';
import ToEnglish from 'src/_helpers/to_english';

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

    this.setScratchTask(props.task);
  }

  componentWillReceiveProps({task}) {
    this.setScratchTask(task);
  }

  setScratchTask(task) {
    if (!task) { return; }

    const newTask = {
      priority: task.priority,
      repeatSeconds: task.repeatSeconds,
      releaseAt: task.releaseAt,
      tagNames: task.tagNames,
      timeframe: task.timeframe,
      parentTaskId: task.id,
      title: '',
    };

    this.props.updateTaskMeta({newTask});
  }

  render() {
    const {task, updateTask, deleteTask} = this.props;

    if (!task) { return null; }

    return (
      <section>
        <ParentTaskBreadCrumbs taskId={task.parentTaskId} />
        <h2>{task.title}</h2>
        <div>{repeatString(task)}</div>
        <div>{estimateString(task)}</div>
        <div>{priorityString(task)}</div>
        <div>{tagString(task)}</div>

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
  task: PropTypes.object,
  updateTask: PropTypes.func.isRequired,
  updateTaskMeta: PropTypes.func.isRequired,
};

export default TaskShowView;
