import React from 'react';

import MainButtons from 'js/task/components/main_buttons';
import TaskTitle from 'js/task/components/task_title';
import TagButtons from 'js/task/components/tag_buttons';
import EditTaskForm from 'js/task/components/edit_task_form';

function TaskDisplay(props) {
  return (
    <div>
      <TagButtons task={props.task} tags={props.tags} />
      <TaskTitle
        task={props.task}
        deleteTask={props.deleteTask}
      />
      <MainButtons
        task={props.task}
        disabled={props.disabled}
        disable={props.disable}
        storePostponeSeconds={props.storePostponeSeconds}
        postponeSeconds={props.postponeSeconds}
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
  completeTask: React.PropTypes.func.isRequired,
  deleteTask: React.PropTypes.func.isRequired,
  disable: React.PropTypes.func.isRequired,
  disabled: React.PropTypes.bool.isRequired,
  postponeSeconds: React.PropTypes.number.isRequired,
  postponeTask: React.PropTypes.func.isRequired,
  storePostponeSeconds: React.PropTypes.func.isRequired,
  storeTask: React.PropTypes.func.isRequired,
  tags: React.PropTypes.array.isRequired,
  task: React.PropTypes.object.isRequired,
};

export default TaskDisplay;
