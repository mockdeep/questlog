import React from 'react';

import Link from 'src/route/containers/link';
import {taskShape} from 'src/shapes';

type Props = {task: Task};

function TaskLink({task}: Props) {
  return (
    <Link to='showTask' className='task-link' params={{taskId: task.id}}>
      {task.title}
    </Link>
  );
}

TaskLink.propTypes = {task: taskShape.isRequired};

export default TaskLink;
