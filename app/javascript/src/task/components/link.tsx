import React from 'react';
import type {ReactElement} from 'react';

type Props = {task: Task};

function TaskLink({task}: Props): ReactElement {
  const path = `/tasks/${task.id}`;

  return (
    <a href={path} className='task-link'>{task.title}</a>
  );
}

export default TaskLink;
