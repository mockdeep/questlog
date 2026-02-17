import type {ReactElement} from "react";

import TaskEditTitleForm from "src/task/components/edit_title_form";
import ParentTaskBreadCrumbs
  from "src/task/containers/parent_task_bread_crumbs";
import SubTasksTable from "src/task/components/sub_tasks_table";
import {ToEnglish} from "helpers";
import type {UpdateTask} from "src/task/action_creators";

function repeatString(task: Task): string {
  if (!task.repeatSeconds) { return "Repeat: never"; }

  return `Repeat: every ${ToEnglish.seconds(task.repeatSeconds)}`;
}

function estimateString(task: Task): string {
  if (!task.estimateSeconds) { return "Estimate: none"; }

  return `Estimate: ${ToEnglish.seconds(task.estimateSeconds)}`;
}

function priorityString(task: Task): string {
  if (!task.priority) { return "Priority: none"; }

  return `Priority: ${task.priority}`;
}

function tagString(task: Task): string {
  if (task.tagNames.length === 0) { return "Tags: none"; }

  return `Tags: ${task.tagNames.join(", ")}`;
}

export type Props = {
  deleteTask: (taskId: number) => void,
  updateTask: UpdateTask,
  subTasks: Task[],
  task: Task | null,
};

function TaskShowView(props: Props): ReactElement | null {
  const {task, subTasks, updateTask, deleteTask} = props;

  if (!task) { return null; }

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
