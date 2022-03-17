import React from 'react';

import Link from 'src/route/containers/link';

function TaskListFilters() {
  return (
    <div className='task-filters'>
      {'Filter: '}
      <Link to='tasks' baseClass='task-filter'>{'ALL'}</Link>
      <Link to='rootTasks' baseClass='task-filter'>{'ROOT'}</Link>
      <Link to='leafTasks' baseClass='task-filter'>{'LEAF'}</Link>
      <Link to='treeTasks' baseClass='task-filter'>{'TREE'}</Link>
      <span className='alpha-tag'>
        <a href='/alpha' data-turbo-frame='dialog' data-turbo='true'>
          <sup>{'(alpha)'}</sup>
        </a>
      </span>
    </div>
  );
}

export default TaskListFilters;
