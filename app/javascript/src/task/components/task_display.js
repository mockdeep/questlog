import PropTypes from 'prop-types';
import React from 'react';

import MainButtons from 'src/task/components/main_buttons';
import ParentTaskBreadCrumbs
  from 'src/task/containers/parent_task_bread_crumbs';
import TaskTitle from 'src/task/components/task_title';
import TagButtonsContainer from 'src/tag/containers/buttons';
import {taskShape} from 'src/shapes';

function TaskDisplay({
  deleteTask,
  disabled,
  storePostponeSeconds,
  postponeTask,
  completeTask,
  task,
}) {
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

TaskDisplay.propTypes = {
  completeTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  postponeTask: PropTypes.func.isRequired,
  storePostponeSeconds: PropTypes.func.isRequired,
  task: taskShape.isRequired,
  updateTask: PropTypes.func.isRequired,
};

export default TaskDisplay;
