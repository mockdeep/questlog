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
            <table>
              <tr>
                <td className='col-md-1'>
                  <Questlog.DeleteButton
                    task={this.props.task}
                    loadTask={this.props.loadTask}
                  />
                </td>
                <td className='col-md-1'>{/* intentionally left blank */}</td>
                <td className='col-md-10 title'>
                  {this.props.task.title}
                </td>

                <td className='col-md-1'>{this.repeatIcon()}</td>
                <td className='col-md-1'>
                  <i
                    className='fa fa-arrow-down edit-button'
                    id='edit-task'
                    title='edit task'
                  />
                </td>
              </tr>
            </table>
          </div>
        </div>
      );
    }
  });

})();
