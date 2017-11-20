import PropTypes from 'prop-types';
import React from 'react';

import Link from 'src/route/containers/link';

function TaskLink({task}) {
  return (
    <Link to='showTask' className='task-link' params={{taskId: task.id}}>
      {task.title}
    </Link>
  );
}

TaskLink.propTypes = {task: PropTypes.object.isRequired};

export default TaskLink;
