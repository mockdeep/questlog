import PropTypes from 'prop-types';
import React from 'react';

import MainButtons from 'src/task/components/main_buttons';
import TaskTitle from 'src/task/components/task_title';
import TagButtonsContainer from 'src/tag/containers/tag_buttons';
import EditTaskForm from 'src/task/components/edit_task_form';

function TaskDisplay(props) {
  return (
    <div>
      <TagButtonsContainer task={props.task} />
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
      <hr />
      <EditTaskForm
        task={props.task}
        storeTask={props.storeTask}
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
  storeTask: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired,
};

export default TaskDisplay;
