import PropTypes from 'prop-types';
import React from 'react';

import MainButtons from 'src/task/components/main_buttons';
import TaskTitle from 'src/task/components/task_title';
import TagButtons from 'src/task/components/tag_buttons';
import EditTaskForm from 'src/task/components/edit_task_form';

function TaskDisplay(props) {
  return (
    <div>
      <TagButtons
        task={props.task}
        tags={props.tags}
        updateTagMeta={props.updateTagMeta}
      />
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
  tags: PropTypes.array.isRequired,
  task: PropTypes.object.isRequired,
  updateTagMeta: PropTypes.func.isRequired,
};

export default TaskDisplay;
