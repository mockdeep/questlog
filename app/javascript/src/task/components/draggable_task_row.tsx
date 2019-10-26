import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React, {ChangeEvent} from 'react';
import {
  DragSource as dragSource, DropTarget as dropTarget,
  DragSourceConnector, DragSourceMonitor, DropTargetConnector,
  DropTargetMonitor,
} from 'react-dnd';

import TaskRow from 'src/task/components/task_row';
import {taskShape, timeframeSpaceShape} from 'src/shapes';

type DragProps = {
  connectDragSource: Function,
  connectDropTarget: Function,
  isDragging: boolean,
};

type OwnProps = {
  deleteTask: Function,
  keyPrefix: string;
  moveTask: Function;
  saveTaskPositions: Function,
  task: Task,
  updateTask: Function,
  status?: string,
  timeframesEnabled?: boolean,
  timeframeSpace?: TimeframeSpace,
};

type Props = DragProps & OwnProps;

const taskSource = {
  canDrag(props: OwnProps) {
    const {timeframesEnabled} = props;

    return !timeframesEnabled;
  },

  beginDrag(props: OwnProps) {
    const {task} = props;

    return {item: {id: task.id}};
  },

  endDrag(
    {saveTaskPositions}: OwnProps,
    _monitor: DragSourceMonitor,
    component: DraggableTaskRow,
  ) {
    saveTaskPositions(component);
  },
};

const taskTarget = {
  hover({moveTask, task}: OwnProps, monitor: DropTargetMonitor) {
    const draggedId = monitor.getItem().item.id;

    moveTask(draggedId, task.id);
  },
};

function sourceCollect(
  connect: DragSourceConnector,
  monitor: DragSourceMonitor,
) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

function targetCollect(connect: DropTargetConnector) {
  return {connectDropTarget: connect.dropTarget()};
}

class DraggableTaskRow extends React.PureComponent<Props, any> {
  constructor(props: Props) {
    super(props);
    autobind(this);
  }

  updatePriority(event: ChangeEvent<HTMLSelectElement>) {
    const {task, updateTask} = this.props;

    updateTask(task.id, {priority: event.target.value});
  }

  bindDragAndDrop(component: TaskRow) {
    if (!component) { return; }

    const {domNode} = component;
    const {connectDragSource, connectDropTarget} = this.props;

    connectDropTarget(domNode);
    connectDragSource(domNode);
  }

  render() {
    const {
      deleteTask,
      isDragging,
      keyPrefix,
      status,
      task,
      timeframeSpace,
      timeframesEnabled,
      updateTask,
    } = this.props;

    return (
      <TaskRow
        deleteTask={deleteTask}
        isDragging={isDragging}
        keyPrefix={keyPrefix}
        status={status}
        task={task}
        timeframeSpace={timeframeSpace}
        timeframesEnabled={timeframesEnabled}
        updateTask={updateTask}
        ref={this.bindDragAndDrop}
      />
    );
  }
}

DraggableTaskRow.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  keyPrefix: PropTypes.string.isRequired,
  task: taskShape.isRequired,
  updateTask: PropTypes.func.isRequired,
  status: PropTypes.string,
  timeframesEnabled: PropTypes.bool,
  timeframeSpace: timeframeSpaceShape,
};

export default dropTarget('task', taskTarget, targetCollect)(
  dragSource('task', taskSource, sourceCollect)(DraggableTaskRow),
);
