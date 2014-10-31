/** @jsx React.DOM */

(function () {

  'use strict';

  Questlog.TaskTitle = React.createClass({
    componentDidMount: function () {
      document.title = 'Task: ' + this.props.task.title;
    },
    className: function () {
      var classString = 'row-fluid';
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
        return <i className='fa fa-repeat' />;
      } else {
        return '';
      }
    },
    render: function () {
      return (
        <div id='task' className={this.className()}>
          <div className='span1'>
            <Questlog.DeleteButton task={this.props.task} loadTask={this.props.loadTask} />
          </div>
          <div className='span10 title' title={this.title()}>
            {this.props.task.title}
            {this.repeatIcon()}
          </div>
          <div className='span1'>
            <i className='fa fa-arrow-down' id='edit-task' title='edit task' />
          </div>
        </div>
      );
    }
  });

})();
