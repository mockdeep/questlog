(function () {
  'use strict';

  var PureRenderMixin = require('react/addons').PureRenderMixin;

  Questlog.TaskRow = React.createClass({
    mixins: [ReactDND.DragDropMixin, PureRenderMixin],

    statics: {
      configureDragDrop: function (register) {
        register('task', {
          dragSource: {
            beginDrag: function (component) {
              return { item: { id: component.props.task.id } };
            },
            canDrag: function (component) {
              return !component.props.pending;
            },
            endDrag: function (component) {
              component.props.saveTaskPositions(component);
            }
          },
          dropTarget: {
            enter: function (component, item) {
              component.props.moveTask(item.id, component.props.task.id);
            }
          }
        });
      }
    },

    markDone: function (event) {
      event.preventDefault();
      Questlog.request({
        url: 'tasks/' + this.props.task.id,
        data: {task: {done: true}},
        success: this.removeTask
      });
    },

    removeTask: function () {
      this.props.removeTask(this.props.task);
      this.props.loadTasks();
    },

    updatePriority: function (event) {
      Questlog.request({
        url: 'tasks/' + this.props.task.id,
        data: {task: {priority: event.target.value}},
        success: this.removeTask
      });
    },

    deleteTask: function (event) {
      event.preventDefault();
      if (confirm('Delete this task?')) {
        Questlog.request({
          url: 'tasks/' + this.props.task.id,
          method: 'delete',
          success: this.props.loadTasks
        });
      }
    },

    emblems: function () {
      if (this.props.task.repeat_seconds) {
        return <i className='fa fa-repeat' title='task repeats' />;
      } else {
        return '';
      }
    },

    className: function () {
      var classString = '';
      if (this.priority()) {
        classString += ' priority-' + this.priority();
      }
      return classString;
    },

    priority: function () {
      return this.props.task.priority;
    },

    render: function () {
      var dragSource = this.dragSourceFor('task');
      var dropTarget = this.dropTargetFor('task');
      var isDragging = this.getDragState('task').isDragging;
      var style = {opacity: isDragging ? 0 : 1};

      return (
        <li className={this.className()} {...dragSource} {...dropTarget} style={style}>
          {this.props.task.title} {this.emblems()}
          {' | Pri: '}
          <select onChange={this.updatePriority} defaultValue={this.priority()}>
            <option value=''>-</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
          </select>
          {' | '}
          <button className='btn btn-link' role='Link' onClick={this.markDone}>
            Done!
          </button>
          {' | '}
          <button className='btn btn-link' role='Link' onClick={this.deleteTask}>
            Delete
          </button>
        </li>
      );
    }
  });

})();
