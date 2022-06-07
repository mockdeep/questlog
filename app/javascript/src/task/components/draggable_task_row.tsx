import autobind from 'class-autobind';
import React, {ChangeEvent} from 'react';
import {
  DragSource as dragSource, DropTarget as dropTarget,
  DragSourceConnector, DragSourceMonitor, DropTargetConnector,
  DropTargetMonitor,
  ConnectDragSource, ConnectDropTarget,
} from 'react-dnd';

import TaskRow from 'src/task/components/task_row';
import {assert} from 'src/_helpers/assert';
import {UpdateTask} from 'src/task/action_creators';

type DragProps = {
  connectDragSource: ConnectDragSource,
  connectDropTarget: ConnectDropTarget,
  isDragging: boolean,
};

type OwnProps = {
  deleteTask: (taskId: number) => void,
  moveTask: (id: number, afterId: number) => void;
  saveTaskPositions: (component: DraggableTaskRow) => void,
  task: Task,
  updateTask: UpdateTask,
  status?: string,
  timeframesEnabled?: boolean,
  timeframeSpace?: TimeframeSpace,
};

type Props = DragProps & OwnProps;

type MonitorItem = { item: { id: number } };

const taskSource = {
  canDrag(props: OwnProps) {
    const {timeframesEnabled} = props;

    return !timeframesEnabled;
  },

  beginDrag(props: OwnProps): MonitorItem {
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
    const draggedId = monitor.getItem<MonitorItem>().item.id;

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

class DraggableTaskRow extends React.PureComponent<Props, never> {
  constructor(props: Props) {
    super(props);
    autobind(this);
  }

  updatePriority(event: ChangeEvent<HTMLSelectElement>) {
    const {task, updateTask} = this.props;

    updateTask(task.id, {priority: parseInt(event.target.value, 10)});
  }

  bindDragAndDrop(component: TaskRow) {
    if (!component) { return; }

    const {domNode} = component;
    const {connectDragSource, connectDropTarget} = this.props;

    connectDropTarget(assert(domNode));
    connectDragSource(assert(domNode));
  }

  render() {
    const {
      deleteTask,
      isDragging,
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

export default dropTarget('task', taskTarget, targetCollect)(
  dragSource('task', taskSource, sourceCollect)(DraggableTaskRow),
);
