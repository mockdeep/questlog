/** @jsx React.DOM */

(function () {

  'use strict';

  Questlog.TaskDisplay = React.createClass({
    render: function () {
      return (
        <div className='container-fluid'>
          <Questlog.TagButtons task={this.props.task} tags={this.props.tags} />
          <Questlog.TaskTitle task={this.props.task}
                              loadTask={this.props.loadTask} />
          <Questlog.MainButtons task={this.props.task}
                                loadTask={this.props.loadTask}
                                disabled={this.props.disabled}
                                disable={this.props.disable} />
          <hr />
          <div id='edit-form'>
            <Questlog.EditTaskForm task={this.props.task}
                                   loadTask={this.props.loadTask} />
          </div>
        </div>
      );
    }
  });

})();
