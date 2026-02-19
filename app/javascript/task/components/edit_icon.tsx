import type {ReactElement} from "react";

type Props = {task: Task};

function TaskEditIcon({task}: Props): ReactElement | null {
  if (!task.id) { return null; }
  const path = `/tasks/${task.id}`;

  return (
    <a href={path} className='task-link'>
      <i className='fas fa-edit' />
    </a>
  );
}

export default TaskEditIcon;
