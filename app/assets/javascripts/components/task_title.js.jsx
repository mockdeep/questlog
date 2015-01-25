/** @jsx React.DOM */

(function () {

  'use strict';

  Questlog.TaskTitle = React.createClass({
    className: function () {
      var classString = 'col-md-12';
      if (this.props.task.priority) {
        classString = classString + ' priority-' + this.props.task.priority;
      }
      if (this.props.task.skip_count >= 15) {
        classString = classString + ' over-skipped';
      }
      return classString;
    },
    title: function () {
      return "skip count: " + this.props.task.skip_count;
    },
    repeatIcon: function () {
      if (this.props.task.repeat_seconds) {
        return <i className='fa fa-repeat' title='task repeats' />;
      } else {
        return '';
      }
    },
    render: function () {
      return (
        <div className='row'>
          <div id='task' className={this.className()}>
            <div className='delete-button'>
              <Questlog.DeleteButton
                task={this.props.task}
                loadTask={this.props.loadTask}
              />
            </div>
            <div className='edit-button'>
              <i
                className='fa fa-arrow-down'
                id='edit-task'
                title='edit task'
              />
            </div>
            <div className='col-md-10' title={this.title()}>
              <div className='emblems'>{this.repeatIcon()}</div>
              <div className='title'>{this.props.task.title}</div>
            </div>
          </div>
        </div>
      );
    }
  });

})();
