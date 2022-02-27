import React from 'react';

import Link from 'src/route/containers/link';

type Props = {task: Task};

function TaskLink({task}: Props) {
  return (
    <Link to='showTask' className='task-link' params={{taskId: task.id}}>
      {task.title}
    </Link>
  );
}

export default TaskLink;
