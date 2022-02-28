import React from 'react';

import TaskEditTitleForm from 'src/task/containers/edit_title_form';
import NewTaskForm from 'src/task/containers/new_task_form';
import ParentTaskBreadCrumbs
  from 'src/task/containers/parent_task_bread_crumbs';
import SubTasksTable from 'src/task/components/sub_tasks_table';
import ToEnglish from 'src/_helpers/to_english';

function repeatString(task: Task) {
  if (!task.repeatSeconds) { return 'Repeat: never'; }

  return `Repeat: every ${ToEnglish.seconds(task.repeatSeconds)}`;
}

function estimateString(task: Task) {
  if (!task.estimateSeconds) { return 'Estimate: none'; }

  return `Estimate: ${ToEnglish.seconds(task.estimateSeconds)}`;
}

function priorityString(task: Task) {
  if (!task.priority) { return 'Priority: none'; }

  return `Priority: ${task.priority}`;
}

function tagString(task: Task) {
  if (task.tagNames.length === 0) { return 'Tags: none'; }

  return `Tags: ${task.tagNames.join(', ')}`;
}

export type Props = {
  deleteTask: Function,
  updateTask: Function,
  updateTaskMeta: Function,
  subTasks: Task[],
  task: Task,
};

class TaskShowView extends React.Component<Props, never> {
  constructor(props: Props) {
    super(props);

    const {task} = this.props;

    this.setTask(task);
  }

  UNSAFE_componentWillReceiveProps({task}: Props) {
    this.setTask(task);
  }

  componentWillUnmount() {
    const {updateTaskMeta} = this.props;

    updateTaskMeta({newTask: {title: ''}});
  }

  setTask(task: Task) {
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
    const {task, subTasks, updateTask, deleteTask} = this.props;

    return (
      <section>
        <ParentTaskBreadCrumbs taskId={task.parentTaskId} />
        <h2><TaskEditTitleForm task={task} /></h2>
        <div>{repeatString(task)}</div>
        <div>{estimateString(task)}</div>
        <div>{priorityString(task)}</div>
        <div>{tagString(task)}</div>

        <SubTasksTable
          subTasks={subTasks}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
        <NewTaskForm />
      </section>
    );
  }
}

export default TaskShowView;
