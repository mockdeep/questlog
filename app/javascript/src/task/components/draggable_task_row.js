import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React from 'react';
import {DragSource as dragSource, DropTarget as dropTarget} from 'react-dnd';
import {flow} from 'lodash';

import TaskRow from 'src/task/components/task_row';

const taskSource = {
  canDrag(props) {
    return !props.timeframesEnabled;
  },

  beginDrag(props) {
    return {item: {id: props.task.id}};
  },

  endDrag(props, _monitor, component) {
    props.saveTaskPositions(component);
  },
};

const taskTarget = {
  hover(props, monitor) {
    const draggedId = monitor.getItem().item.id;

    props.moveTask(draggedId, props.task.id);
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

class DraggableTaskRow extends React.PureComponent {
  constructor(props) {
    super(props);
    autobind(this);
  }

  updatePriority(event) {
    this.props.updateTask(this.props.task.id, {priority: event.target.value});
  }

  bindDragAndDrop(component) {
    if (!component) { return; }

    const {domNode} = component;

    this.props.connectDropTarget(domNode);
    this.props.connectDragSource(domNode);
  }

  render() {
    return (
      <TaskRow
        deleteTask={this.props.deleteTask}
        isDragging={this.props.isDragging}
        status={this.props.status}
        task={this.props.task}
        timeframeSpace={this.props.timeframeSpace}
        timeframesEnabled={this.props.timeframesEnabled}
        updateTask={this.props.updateTask}
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
  status: PropTypes.string,
  task: PropTypes.object.isRequired,
  timeframeSpace: PropTypes.object,
  timeframesEnabled: PropTypes.bool,
  updateTask: PropTypes.func.isRequired,
};

export default flow(
  dragSource('task', taskSource, sourceCollect),
  dropTarget('task', taskTarget, targetCollect)
)(DraggableTaskRow);
