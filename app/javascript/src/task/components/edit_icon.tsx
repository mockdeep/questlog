import React from 'react';

import Link from 'src/route/containers/link';

type Props = {task: Task};

function TaskEditIcon({task}: Props) {
  if (!task.id) { return null; }

  return (
    <Link to='showTask' className='task-link' params={{taskId: task.id}}>
      <i className='fas fa-edit' />
    </Link>
  );
}

export default TaskEditIcon;
