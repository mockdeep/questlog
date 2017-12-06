import PropTypes from 'prop-types';
import React from 'react';

import Link from 'src/route/containers/link';

function TaskEditIcon({task}) {
  if (!task.id) { return null; }

  return (
    <Link to='showTask' className='task-link' params={{taskId: task.id}}>
      <i className='fa fa-edit' />
    </Link>
  );
}

TaskEditIcon.propTypes = {task: PropTypes.object.isRequired};

export default TaskEditIcon;
