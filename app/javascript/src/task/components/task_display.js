import PropTypes from 'prop-types';
import React from 'react';

import MainButtons from 'src/task/components/main_buttons';
import ParentTaskBreadCrumbs from 'src/task/containers/parent_task_bread_crumbs';
import TaskTitle from 'src/task/components/task_title';
import TagButtonsContainer from 'src/tag/containers/buttons';

function TaskDisplay(props) {
  return (
    <div>
      <TagButtonsContainer currentTagIds={props.task && props.task.tagIds} />
      <div className='row'>
        <ParentTaskBreadCrumbs taskId={props.task.parentTaskId} />
      </div>
      <TaskTitle
        task={props.task}
        deleteTask={props.deleteTask}
      />
      <MainButtons
        task={props.task}
        disabled={props.disabled}
        storePostponeSeconds={props.storePostponeSeconds}
        postponeTask={props.postponeTask}
        completeTask={props.completeTask}
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
  task: PropTypes.object.isRequired,
  updateTask: PropTypes.func.isRequired,
};

export default TaskDisplay;
