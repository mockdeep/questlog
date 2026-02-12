import React from "react";

import DoneButton from "src/task/components/done_button";
import PostponeButton from "src/task/components/postpone_button";

type Props = {
  completeTask: (taskId: number) => void,
  disabled: boolean,
  postponeTask: (taskId: number) => void,
  storePostponeSeconds: (seconds: number) => void,
  task: Task,
};

function MainButtons({
  completeTask,
  disabled,
  postponeTask,
  storePostponeSeconds,
  task,
}: Props) {
  return (
    <div id='buttons' className='row main-button'>
      <div className='col-md-6'>
        <DoneButton
          task={task}
          completeTask={completeTask}
        />
      </div>
      <div className='col-md-6'>
        <PostponeButton
          task={task}
          disabled={disabled}
          storePostponeSeconds={storePostponeSeconds}
          postponeTask={postponeTask}
        />
      </div>
    </div>
  );
}

export default MainButtons;
