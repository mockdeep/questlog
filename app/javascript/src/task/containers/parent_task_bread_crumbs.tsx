import type {ReactElement} from 'react';
import React from 'react';
import {connect} from 'react-redux';

import TaskLink from 'src/task/components/link';

type ComponentProps = {
  task?: Task;
};

type ContainerProps = {
  taskId: number | null;
};

// The component is in the same file as the container due to circular references
// ParentTaskBreadCrumbs renders ParentTaskBreadCrumbsContainer and vice versa
// otherwise imports get funky
class ParentTaskBreadCrumbs extends React.Component<ComponentProps, never> {
  render(): ReactElement | null {
    const {task} = this.props;
    if (!task) { return null; }

    // span wrapper rather than array fragments due to lack of enzyme support
    // https://github.com/airbnb/enzyme/issues/1213
    // hack didn't work
    return (
      <span>
        {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
        <ParentTaskBreadCrumbsContainer taskId={task.parentTaskId} />
        <span>
          {' > '}
          <TaskLink task={task} />
        </span>
      </span>
    );
  }
}

function mapStateToProps(state: State, ownProps: ContainerProps) {
  const {taskId} = ownProps;
  let task;
  if (taskId !== null) { task = state.task.byId[taskId]; }
  return {task};
}

const ParentTaskBreadCrumbsContainer =
  connect(mapStateToProps)(ParentTaskBreadCrumbs);

export {ParentTaskBreadCrumbs};
export default ParentTaskBreadCrumbsContainer;
