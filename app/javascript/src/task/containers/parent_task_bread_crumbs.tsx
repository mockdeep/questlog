import React from 'react';
import {connect} from 'react-redux';

import TaskLink from 'src/task/components/link';
import {taskShape} from 'src/shapes';

// The component is in the same file as the container due to circular references
// ParentTaskBreadCrumbs renders ParentTaskBreadCrumbsContainer and vice versa
// otherwise imports get funky
function ParentTaskBreadCrumbs({task = null}) {
  if (!task) { return null; }

  // span wrapper rather than array fragments due to lack of enzyme support
  // https://github.com/airbnb/enzyme/issues/1213
  // hack didn't work
  return (
    <span>
      <ParentTaskBreadCrumbsContainer taskId={task.parentTaskId} />
      <span>
        {' > '}
        <TaskLink task={task} />
      </span>
    </span>
  );
}

ParentTaskBreadCrumbs.propTypes = {task: taskShape};

function mapStateToProps(state, ownProps) {
  return {task: state.task.byId[ownProps.taskId]};
}

const ParentTaskBreadCrumbsContainer =
  connect(mapStateToProps)(ParentTaskBreadCrumbs);

export {ParentTaskBreadCrumbs};
export default ParentTaskBreadCrumbsContainer;
