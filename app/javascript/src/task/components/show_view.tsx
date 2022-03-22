import React from 'react';

import TaskEditTitleForm from 'src/task/containers/edit_title_form';
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
  subTasks: Task[],
  task: Task,
};

function TaskShowView(props: Props) {
  const {task, subTasks, updateTask, deleteTask} = props;

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
    </section>
  );
}

export default TaskShowView;
