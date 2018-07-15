import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React from 'react';
import {DragSource as dragSource, DropTarget as dropTarget} from 'react-dnd';
import {flow} from 'lodash';

import TaskRow from 'src/task/components/task_row';
import {taskShape, timeframeSpaceShape} from 'src/shapes';

const taskSource = {
  canDrag({timeframesEnabled}) {
    return !timeframesEnabled;
  },

  beginDrag({task}) {
    return {item: {id: task.id}};
  },

  endDrag({saveTaskPositions}, _monitor, component) {
    saveTaskPositions(component);
  },
};

const taskTarget = {
  hover({moveTask, task}, monitor) {
    const draggedId = monitor.getItem().item.id;

    moveTask(draggedId, task.id);
  },
};

function sourceCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

function targetCollect(connect) {
  return {connectDropTarget: connect.dropTarget()};
}

class DraggableTaskRow extends React.PureComponent<any, any> {
  constructor(props) {
    super(props);
    autobind(this);
  }

  updatePriority(event) {
    const {task, updateTask} = this.props;

    updateTask(task.id, {priority: event.target.value});
  }

  bindDragAndDrop(component) {
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

export default flow(
  dragSource('task', taskSource, sourceCollect),
  dropTarget('task', taskTarget, targetCollect)
)(DraggableTaskRow);
