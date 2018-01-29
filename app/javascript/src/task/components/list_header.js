import React from 'react';

import Link from 'src/route/containers/link';
import NewTaskForm from 'src/task/containers/new_task_form';

function TaskListHeader() {
  return (
    <div>
      <NewTaskForm />
      <br />
      {'Filter: '}
      <Link to='tasks' baseClass='task-filter'>{'ALL'}</Link>
      <Link to='rootTasks' baseClass='task-filter'>{'ROOT'}</Link>
      <Link to='leafTasks' baseClass='task-filter'>{'LEAF'}</Link>
    </div>
  );
}

export default TaskListHeader;
