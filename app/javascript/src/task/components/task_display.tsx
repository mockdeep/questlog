import React from "react";

import MainButtons from "src/task/components/main_buttons";
import ParentTaskBreadCrumbs
  from "src/task/containers/parent_task_bread_crumbs";
import TaskTitle from "src/task/components/task_title";
import TagButtonsContainer from "src/tag/containers/buttons";

type TaskDisplayProps = {
  deleteTask: (taskId: number) => void;
  disabled: boolean;
  storePostponeSeconds: (seconds: number) => void;
  postponeTask: (taskId: number) => void;
  completeTask: (taskId: number) => void;
  task: Task;
};

function TaskDisplay({
  deleteTask,
  disabled,
  storePostponeSeconds,
  postponeTask,
  completeTask,
  task,
}: TaskDisplayProps) {
  return (
    <div>
      <TagButtonsContainer currentTagIds={task && task.tagIds} />
      <div className='row'>
        <ParentTaskBreadCrumbs taskId={task.parentTaskId} />
      </div>
      <TaskTitle task={task} deleteTask={deleteTask} />
      <MainButtons
        task={task}
        disabled={disabled}
        storePostponeSeconds={storePostponeSeconds}
        postponeTask={postponeTask}
        completeTask={completeTask}
      />
    </div>
  );
}

export default TaskDisplay;
