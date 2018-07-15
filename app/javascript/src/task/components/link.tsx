import React from 'react';

import Link from 'src/route/containers/link';
import {taskShape} from 'src/shapes';

function TaskLink({task}) {
  return (
    <Link to='showTask' className='task-link' params={{taskId: task.id}}>
      {task.title}
    </Link>
  );
}

TaskLink.propTypes = {task: taskShape.isRequired};

export default TaskLink;
