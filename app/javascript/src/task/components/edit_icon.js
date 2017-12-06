import React from 'react';

import Link from 'src/route/containers/link';
import {taskShape} from 'src/shapes';

function TaskEditIcon({task}) {
  if (!task.id) { return null; }

  return (
    <Link to='showTask' className='task-link' params={{taskId: task.id}}>
      <i className='fa fa-edit' />
    </Link>
  );
}

TaskEditIcon.propTypes = {task: taskShape.isRequired};

export default TaskEditIcon;
