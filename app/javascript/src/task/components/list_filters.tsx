import React from 'react';

import Link from 'src/route/containers/link';
import ModalLink from 'src/_common/containers/modal_link';

function TaskListFilters() {
  return (
    <div className='task-filters'>
      {'Filter: '}
      <Link to='tasks' baseClass='task-filter'>{'ALL'}</Link>
      <Link to='rootTasks' baseClass='task-filter'>{'ROOT'}</Link>
      <Link to='leafTasks' baseClass='task-filter'>{'LEAF'}</Link>
      <Link to='treeTasks' baseClass='task-filter'>{'TREE'}</Link>
      <ModalLink modalName='alpha' className='alpha-tag'>
        <sup>{'(alpha)'}</sup>
      </ModalLink>
    </div>
  );
}

export default TaskListFilters;
